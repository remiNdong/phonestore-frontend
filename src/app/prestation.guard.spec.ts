import { TestBed } from '@angular/core/testing';

import { PrestationGuard } from './prestation.guard';

describe('PrestationGuard', () => {
  let guard: PrestationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrestationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
