import { TestBed } from '@angular/core/testing';

import { ActivityUpload } from './activity-upload';

describe('ActivityUpload', () => {
  let service: ActivityUpload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityUpload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
