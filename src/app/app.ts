import { Component, signal, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExternalNavigation } from './services/external-navigation';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements OnInit {
  protected readonly title = signal('omni-portal');
  extNavigator = inject(ExternalNavigation);
  config = inject(ConfigService);
  opened = signal(true);
  sidenavMode = signal<'side' | 'over'>('side');
  isMobile = signal(false);

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const mobile = window.innerWidth <= 768;
    this.isMobile.set(mobile);
    this.sidenavMode.set(mobile ? 'over' : 'side');
    if (mobile) {
      this.opened.set(false);
    } else {
      this.opened.set(true);
    }
  }

  toggleSidebar() {
    this.opened.update((val) => !val);
  }

  closeSidebar() {
    if (this.isMobile()) {
      this.opened.set(false);
    }
  }

  openLogsMonitor() {
    this.extNavigator.openInNewTab(this.config.getLogsMonitorUrl());
  }
}
