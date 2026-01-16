import { TestBed } from '@angular/core/testing';

import { AnalyticsStore } from './analytics-store';

describe('AnalyticsStore', () => {
  let service: AnalyticsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
