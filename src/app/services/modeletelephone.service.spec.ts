import { TestBed } from '@angular/core/testing';


import { ModeletelephoneService } from './modeletelephone.service';

describe('ModeletelephoneService', () => {
  let service: ModeletelephoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeletelephoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
