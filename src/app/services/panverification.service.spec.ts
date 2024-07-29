import { TestBed } from '@angular/core/testing';

import { PanverificationService } from './panverification.service';

describe('PanverificationService', () => {
  let service: PanverificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanverificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
