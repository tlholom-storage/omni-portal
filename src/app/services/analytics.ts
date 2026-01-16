import { Injectable } from '@angular/core';
import { Client } from './client';

export interface StatusByManager {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string }[];
}

export interface GrowthByMonth {
  labels: string[];
  data: number[];
}

export interface ClientSummary {
  total: number;
  active: number;
  inactive: number;
  lead: number;
}

export interface ClientSummaryComparison {
  allTime: ClientSummary;
  currentMonth: ClientSummary;
  previousMonth: ClientSummary;
}

@Injectable()
export class AnalyticsService {
  constructor() {}

  getClientSummary(clients: Client[]): ClientSummaryComparison {
    const now = new Date();

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const previousMonth = prevMonthDate.getMonth();
    const previousYear = prevMonthDate.getFullYear();

    const isMonth = (d: Date, m: number, y: number) => d.getMonth() === m && d.getFullYear() === y;

    const summarize = (list: Client[]): ClientSummary => ({
      total: list.length,
      active: list.filter((c) => c.status === 'Active').length,
      inactive: list.filter((c) => c.status === 'Inactive').length,
      lead: list.filter((c) => c.status === 'Lead').length,
    });

    return {
      allTime: summarize(clients),

      currentMonth: summarize(
        clients.filter((c) => isMonth(new Date(c.createdAt), currentMonth, currentYear))
      ),

      previousMonth: summarize(
        clients.filter((c) => isMonth(new Date(c.createdAt), previousMonth, previousYear))
      ),
    };
  }

  /** Clients per status (for bar chart) */
  getClientsByStatus(clients: Client[]) {
    const summary = this.getClientSummary(clients);
    return [summary.allTime.active, summary.allTime.inactive, summary.allTime.lead];
  }

  getClientsByStatusChart(clients: Client[]) {
  return {
    labels: ['Active', 'Inactive', 'Lead'],
    datasets: [
      {
        label: 'Clients',
        data: this.getClientsByStatus(clients),
        backgroundColor: ['#198754', '#dc3545', '#ffc107'],
      },
    ],
  };
}

  getClientsByManager(clients: Client[]) {
    const managerMap: { [manager: string]: number } = {};
    clients.forEach((c) => {
      managerMap[c.assignedManagerEmail] = (managerMap[c.assignedManagerEmail] || 0) + 1;
    });

    const labels = Object.keys(managerMap);
    const data = Object.values(managerMap);

    const backgroundColor = labels.map(() => `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`);

    return { labels, data, backgroundColor };
  }

  getClientGrowthByMonth(clients: Client[]): GrowthByMonth {
    const monthMap: { [month: string]: number } = {};

    clients.forEach((client) => {
      const date = new Date(client.createdAt);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthMap[month] = (monthMap[month] || 0) + 1;
    });

    const labels = Object.keys(monthMap).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
    const data = labels.map((label) => monthMap[label]);

    return { labels, data };
  }

  getStatusByManager(clients: Client[]): StatusByManager {
    const managerMap: { [manager: string]: { Active: number; Inactive: number; Lead: number } } =
      {};

    clients.forEach((c) => {
      if (!managerMap[c.assignedManagerEmail]) {
        managerMap[c.assignedManagerEmail] = { Active: 0, Inactive: 0, Lead: 0 };
      }
      managerMap[c.assignedManagerEmail][c.status as 'Active' | 'Inactive' | 'Lead'] += 1;
    });

    const labels = Object.keys(managerMap);
    const datasets = [
      {
        label: 'Active',
        data: labels.map((m) => managerMap[m].Active),
        backgroundColor: '#198754',
      },
      {
        label: 'Inactive',
        data: labels.map((m) => managerMap[m].Inactive),
        backgroundColor: '#dc3545',
      },
      { label: 'Lead', data: labels.map((m) => managerMap[m].Lead), backgroundColor: '#ffc107' },
    ];

    return { labels, datasets };
  }

  /** Top managers by number of clients */
  getTopManagers(clients: Client[], count = 5) {
    const managerMap: { [manager: string]: number } = {};
    clients.forEach((c) => {
      managerMap[c.assignedManagerEmail] = (managerMap[c.assignedManagerEmail] || 0) + 1;
    });

    return Object.entries(managerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([managerEmail, clientCount]) => ({ managerEmail, clientCount }));
  }
}
