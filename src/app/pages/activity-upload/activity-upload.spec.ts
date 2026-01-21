import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityUpload } from './activity-upload';

describe('ActivityUpload', () => {
  let component: ActivityUpload;
  let fixture: ComponentFixture<ActivityUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityUpload);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
