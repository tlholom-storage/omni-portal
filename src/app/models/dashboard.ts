export type SummaryMetric = 'total' | 'active' | 'inactive' | 'lead';

export interface SummaryConfig {
  metric: SummaryMetric;
  icon: string;
  iconColor: string;
}

export interface AnalyticsAction {
  type: 'route' | 'callback';
  label: string;
  route?: string;
  action?: () => void;
}


export interface AnalyticsConfig {
  type: 'line' | 'bar' | 'pie';
  metric:
    | 'growthByMonth'
    | 'clientsByStatus'
    | 'clientsByManager'
    | 'statusByManager';

  action?: AnalyticsAction;
}

export interface IWidget {
  id: number;
  label: string;
  content: any;
  summaryConfig?: SummaryConfig;
  analyticsConfig?: AnalyticsConfig;
  backgroundColor?: string;
  color?: string;
  columns?: number;
  rows?: number;
}

