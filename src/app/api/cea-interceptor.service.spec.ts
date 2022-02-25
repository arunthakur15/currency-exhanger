import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CEAInterceptorService } from './cea-interceptor.service';

describe('CEAInterceptorService', () => {
  let service: CEAInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CEAInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
