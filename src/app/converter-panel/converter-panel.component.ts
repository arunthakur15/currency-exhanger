import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyExchangeService } from '../api/currency-exchange.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {
  fromCur: string = 'EUR';
  toCur: string = 'USD';
  currentRate: string = '';
  private subscription = new Subscription();
  constructor(private exchangeRate: CurrencyExchangeService) { }

  ngOnInit(): void {
    this.currecyExchangeRates();
    this.getCurrencyList();
  }

  currecyExchangeRates() {
    this.subscription.add(
      this.exchangeRate.getRates(this.fromCur,this.toCur).subscribe(data => {
        console.log(data[Object.keys(data)[0]]);
        this.currentRate = data[Object.keys(data)[0]]
      })
    )
  }

  getCurrencyList() {
    this.subscription.add(
      this.exchangeRate.getAllCurrencyNames().subscribe(data => {
        console.log(data);
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
