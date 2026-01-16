import { Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IWidget, SummaryConfig } from '../../models/dashboard';
import { AnalyticsService } from '../../services/analytics';
import { ClientService } from '../../services/client';
import { ClientStore } from '../../services/client-store';
import { compareWithLastMonth } from '../../models/summary-comparison';

@Component({
  selector: 'app-summary-widget',
  imports: [MatIconModule],
  templateUrl: './summary-widget.html',
  styleUrl: './summary-widget.scss',
})
export class SummaryWidget {
  config = input.required<SummaryConfig>();

  private clients = inject(ClientStore).clients;
  private analytics = inject(AnalyticsService);

  summary = computed(() => this.analytics.getClientSummary(this.clients()));

  value = computed(() => {
    const metric = this.config().metric;
    return this.summary().allTime[metric];
  });

  comparison = computed(() => {
    const metric = this.config().metric;
    return compareWithLastMonth(
      this.summary().currentMonth[metric],
      this.summary().previousMonth[metric]
    );
  });
}
