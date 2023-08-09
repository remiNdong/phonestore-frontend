import { TestBed } from '@angular/core/testing';

import { EmployesGuard } from './employes.guard';

describe('EmployesGuard', () => {
  let guard: EmployesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmployesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
