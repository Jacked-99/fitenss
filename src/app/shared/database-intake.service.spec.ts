import { TestBed } from '@angular/core/testing';

import { DatabaseIntakeService } from './database-intake.service';

describe('DatabaseIntakeService', () => {
  let service: DatabaseIntakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseIntakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
