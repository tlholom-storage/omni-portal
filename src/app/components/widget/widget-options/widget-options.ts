import { Component, model, input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { IWidget } from '../../../models/dashboard';
import { Dashboard as DashboardService } from '../../../services/dashboard';

@Component({
  selector: 'app-widget-options',
  imports: [MatButtonModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './widget-options.html',
  styleUrl: './widget-options.scss',
})
export class WidgetOptions {
  showOptions = model<boolean>(false);
  data = input.required<IWidget>()

  store = inject(DashboardService)
}
