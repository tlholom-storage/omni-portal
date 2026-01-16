import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryWidget } from './summary-widget';

describe('SummaryWidget', () => {
  let component: SummaryWidget;
  let fixture: ComponentFixture<SummaryWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
