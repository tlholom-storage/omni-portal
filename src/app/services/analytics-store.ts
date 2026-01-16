import { Injectable, computed } from '@angular/core';
import { AnalyticsService } from './analytics';
import { ClientStore } from './client-store';

@Injectable()
export class AnalyticsStore {
  constructor(private clientStore: ClientStore, private analytics: AnalyticsService) {
    clientStore.loadClients();
  }

  summary = computed(() => this.analytics.getClientSummary(this.clientStore.clients()));

  growthByMonth = computed(() => this.analytics.getClientGrowthByMonth(this.clientStore.clients()));

  byManager = computed(() => this.analytics.getClientsByManager(this.clientStore.clients()));

  statusByManager = computed(() => this.analytics.getStatusByManager(this.clientStore.clients()));

  clientsByStatus = computed(() => this.analytics.getClientsByStatusChart(this.clientStore.clients()));
}
