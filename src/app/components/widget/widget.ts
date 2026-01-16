import { WidgetOptions } from './widget-options/widget-options';
import { NgComponentOutlet } from '@angular/common';
import { IWidget } from './../../models/dashboard';
import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-widget',
  imports: [NgComponentOutlet, MatButtonModule, MatIconModule, WidgetOptions],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
  host: {
    '[style.grid-area]': '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)'
  }
})
export class Widget {
  data = input.required<IWidget>();
  showOptions = signal<boolean>(false)
}
