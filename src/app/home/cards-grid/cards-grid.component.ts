import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/api/currency-exchange.service';
import { SharedService } from 'src/app/utils/shared-service.service';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent implements OnInit {
  // Arrya for popular currencies
  mostPopularCurrencies : string[] = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'];
  defaultFromCur: string = 'EUR';
  latestRateCur: Object;
  amount:number = 25;
  private subscription = new Subscription();
  constructor(private exchangeRate: CurrencyExchangeService, private sharedService: SharedService) { }

  ngOnInit(): void {

    this.getPopularCurrencyRates();

    /**
     * Calling get shared data to read the current from and to crruency in converter panel.
     */
    this.subscription.add(
    this.sharedService.getSharedData$.subscribe(data => {
      this.defaultFromCur = data.fromCur;
      this.amount = data.amount;
      this.getPopularCurrencyRates();
    }));
  }

  /**
   * Function to fetch exchange rate of multiple popular currencies
   */
  getPopularCurrencyRates(){
    this.exchangeRate.getMultiCurrencyRates(this.defaultFromCur, this.mostPopularCurrencies.map(data => data).join(',')).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data)).results;
      this.latestRateCur = res;
    })
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
