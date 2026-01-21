import { TestBed } from '@angular/core/testing';

import { ExternalNavigation } from './external-navigation';

describe('ExternalNavigation', () => {
  let service: ExternalNavigation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalNavigation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
