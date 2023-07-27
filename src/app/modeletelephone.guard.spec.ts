import { TestBed } from '@angular/core/testing';

import { ModeletelephoneGuard } from './modeletelephone.guard';

describe('ModeletelephoneGuard', () => {
  let guard: ModeletelephoneGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModeletelephoneGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
