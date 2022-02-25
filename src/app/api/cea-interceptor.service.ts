import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CEAInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          const errorMsg = JSON.stringify(err.error.error) ? JSON.stringify(err.error.error) : 'Unknown error! Please try later.';
          alert(errorMsg);
        }

        return new Observable<HttpEvent<any>>();
      }));
  }
}
