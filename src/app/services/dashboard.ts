import { AnalyticsWidget } from '../components/analytics-widget/analytics-widget';
import { SummaryWidget } from '../components/summary-widget/summary-widget';
import { IWidget } from './../models/dashboard';
import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable()
export class Dashboard {
  widgets = signal<IWidget[]>([
    {
      id: 1,
      label: 'Total Clients',
      content: SummaryWidget,
      summaryConfig: { metric: 'total', icon: 'groups', iconColor: '#0d6efd' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 2,
      label: 'Inactive Clients',
      content: SummaryWidget,
      summaryConfig: { metric: 'inactive', icon: 'person_off', iconColor: '#dc3545' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 3,
      label: 'Active Clients',
      content: SummaryWidget,
      summaryConfig: { metric: 'active', icon: 'check_circle', iconColor: '#198754' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 4,
      label: 'Leads',
      content: SummaryWidget,
      summaryConfig: { metric: 'lead', icon: 'trending_up', iconColor: '#ffc107' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },

    {
      id: 5,
      label: 'Client Growth',
      content: AnalyticsWidget,
      analyticsConfig: {
        type: 'line',
        metric: 'growthByMonth',
        action: {
          type: 'route',
          label: 'View client history',
          route: '/clients',
        },
      },
      backgroundColor: 'white',
      color: 'black',
      columns: 2,
      rows: 2,
    },

    {
      id: 6,
      label: 'Clients by Status',
      content: AnalyticsWidget,
      analyticsConfig: {
        type: 'bar',
        metric: 'clientsByStatus',
      },
      backgroundColor: 'white',
      color: 'black',
      columns: 2,
      rows: 2,
    },

    {
      id: 7,
      label: 'Clients by Manager',
      content: AnalyticsWidget,
      analyticsConfig: {
        type: 'pie',
        metric: 'clientsByManager',
      },
      backgroundColor: 'white',
      color: 'black',
      columns: 2,
      rows: 2,
    },

    {
      id: 8,
      label: 'Status by Manager',
      content: AnalyticsWidget,
      analyticsConfig: {
        type: 'bar',
        metric: 'statusByManager',
      },
      backgroundColor: 'white',
      color: 'black',
      columns: 2,
      rows: 2,
    },
  ]);

  addedWidgets = signal<IWidget[]>([
        {
      id: 1,
      label: 'Total Clients',
      content: SummaryWidget,
      summaryConfig: { metric: 'total', icon: 'groups', iconColor: '#0d6efd' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 2,
      label: 'Inactive Clients',
      content: SummaryWidget,
      summaryConfig: { metric: 'inactive', icon: 'person_off', iconColor: '#dc3545' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 3,
      label: 'Active Clients',
      content: SummaryWidget,
      summaryConfig: { metric: 'active', icon: 'check_circle', iconColor: '#198754' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 4,
      label: 'Leads',
      content: SummaryWidget,
      summaryConfig: { metric: 'lead', icon: 'trending_up', iconColor: '#ffc107' },
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },

    {
      id: 5,
      label: 'Client Growth',
      content: AnalyticsWidget,
      analyticsConfig: {
        type: 'line',
        metric: 'growthByMonth',
        action: {
          type: 'route',
          label: 'View client history',
          route: '/clients',
        },
      },
      backgroundColor: 'white',
      color: 'black',
      columns: 2,
      rows: 2,
    },
  ]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  addWidget(w: IWidget): void {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]);
  }

  updateWidget(id: number, widget: Partial<IWidget>) {
    const index = this.addedWidgets().findIndex((w) => w.id == id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = {
        ...newWidgets[index],
        ...widget,
      };
      this.addedWidgets.set(newWidgets);
    }
  }

  moveWidgetsToRight(id: number): void {
    const index = this.addedWidgets().findIndex((w) => w.id == id);

    if (index === this.addedWidgets().length - 1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [
      { ...newWidgets[index + 1] },
      { ...newWidgets[index] },
    ];

    this.addedWidgets.set(newWidgets);
  }

  moveWidgetsToLeft(id: number): void {
    const index = this.addedWidgets().findIndex((w) => w.id == id);

    if (index === 0) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [
      { ...newWidgets[index - 1] },
      { ...newWidgets[index] },
    ];

    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number): void {
    const widgetListWithoutItemToBeRemoved = this.addedWidgets().filter((w) => w.id !== id);
    this.addedWidgets.set(widgetListWithoutItemToBeRemoved);
  }

  fetchWidgets(): void {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');

    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as IWidget[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets);
    }
  }

  constructor() {
    this.fetchWidgets();
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<IWidget>[] = this.addedWidgets().map((w) => ({ ...w }));

    widgetsWithoutContent.forEach((w) => {
      delete w.content;
    });

    localStorage.setItem('dashboardWidgets', JSON.stringify(widgetsWithoutContent));
  });
}
