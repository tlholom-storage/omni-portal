import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetOptions } from './widget-options';

describe('WidgetOptions', () => {
  let component: WidgetOptions;
  let fixture: ComponentFixture<WidgetOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetOptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
