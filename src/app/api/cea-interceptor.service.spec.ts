import { TestBed } from '@angular/core/testing';

import { CEAInterceptorService } from './cea-interceptor.service';

describe('CEAInterceptorService', () => {
  let service: CEAInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CEAInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
