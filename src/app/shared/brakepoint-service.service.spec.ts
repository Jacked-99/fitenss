import { TestBed } from '@angular/core/testing';

import { BrakepointServiceService } from './brakepoint-service.service';

describe('BrakepointServiceService', () => {
  let service: BrakepointServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrakepointServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
