import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs-compat/operator/retry';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { currencies } from 'currencies.json';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(private http: HttpClient) { }
  
  getRates(fromCur:string, toCur:string): Observable<HttpResponse<any>> {
    let url = `${environment.API_URL}convert?q=${fromCur}_${toCur}&compact=ultra&apiKey=${environment.API_KEY}`;
    return this.http.request<any>('get',url);
  }

  getAllCurrencyNames(){
    return currencies;
  }
}
