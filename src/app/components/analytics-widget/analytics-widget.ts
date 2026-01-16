import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Input,
  OnInit,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import Chart, { ChartData, ChartOptions, ChartType } from 'chart.js/auto';
import { AnalyticsStore } from '../../services/analytics-store';
import { AnalyticsConfig } from '../../models/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analytics-widget',
  imports: [MatButtonModule],
  providers: [AnalyticsStore],
  templateUrl: './analytics-widget.html',
  styleUrl: './analytics-widget.scss',
})
export class AnalyticsWidget implements OnInit {
  config = input.required<AnalyticsConfig>();
  private analyticsStore = inject(AnalyticsStore);
  private router = inject(Router);

  chartRef = viewChild.required<ElementRef<HTMLCanvasElement>>('chart');
  private chart?: Chart;

  constructor() {
    effect(() => {
      this.renderChart();
    });
  }
  ngOnInit(): void {}

  private renderChart() {
    const cfg = this.config();
    let data: ChartData | undefined;
    let options: ChartOptions = {};

    switch (cfg.metric) {
      case 'growthByMonth': {
        const g = this.analyticsStore.growthByMonth();
        if (!g.labels.length) return;

        data = {
          labels: g.labels,
          datasets: [
            {
              label: 'Client Growth',
              data: g.data,
              borderColor: '#0d6efd',
              backgroundColor: 'rgba(13,110,253,0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        };
        break;
      }

      case 'clientsByManager': {
        const pie = this.analyticsStore.byManager();
        if (!pie.labels.length) return;

        data = {
          labels: pie.labels,
          datasets: [{ data: pie.data, backgroundColor: pie.backgroundColor }],
        };
        break;
      }

      case 'statusByManager': {
        const stacked = this.analyticsStore.statusByManager();
        if (!stacked.labels.length) return;

        data = stacked;
        options = {
          scales: { x: { stacked: true }, y: { stacked: true } },
        };
        break;
      }

      case 'clientsByStatus': {
        const chart = this.analyticsStore.clientsByStatus();
        if (!chart.labels.length) return;

        data = chart;
        break;
      }
    }

    this.chart?.destroy();

    this.chart = new Chart(this.chartRef().nativeElement, {
      type: cfg.type as ChartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
      },
    });
  }

  onActionClick() {
    const action = this.config().action;
    if (!action) return;

    if (action.type === 'route' && action.route) {
      this.router.navigate([action.route]);
    }

    if (action.type === 'callback' && action.action) {
      action.action();
    }
  }
}
