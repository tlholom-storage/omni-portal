import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExternalNavigation {
    openInNewTab(url: string): void {
    if (!url) {
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

