import { Injectable } from '@angular/core';

declare global {
  interface Window {
    ENV: {
      apiBaseUrl: string;
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
}
