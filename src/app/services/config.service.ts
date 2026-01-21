import { Injectable } from '@angular/core';

declare global {
  interface Window {
    ENV: {
      apiBaseUrl: string;
      logsMonitorUrl: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getApiBaseUrl(): string {
    return window.ENV?.apiBaseUrl || 'https://localhost:7178/api';
  }

  getLogsMonitorUrl(): string {
    return window.ENV?.logsMonitorUrl || 'https://localhost:7039';
  }
}
