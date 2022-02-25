import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Currency } from 'currencies.json';
import { Subscription } from 'rxjs';
import { CurrencyExchangeService } from '../api/currency-exchange.service';
import { SharedService } from '../utils/shared-service.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {
  pageTitle: string = 'Currency Exchanger';
  @Input() currencyDetails;
  currentRate: string = '';
  currencyList: Currency[] = [];
  converterForm: FormGroup;
  result: string;
  defaultAmt: number = 25;
  private subscription = new Subscription();
  constructor(private exchangeRate: CurrencyExchangeService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    // Form element creation
    this.converterForm = new FormGroup({
      fromCur: new FormControl('EUR'),
      toCur: new FormControl('USD'),
      amount: new FormControl(this.defaultAmt),
    });

    // Updating form values based on pass input from parent component
    if (this.currencyDetails) {
      this.converterForm.controls.fromCur.setValue(this.currencyDetails?.fromCur);
      this.converterForm.controls.toCur.setValue(this.currencyDetails?.toCur);
      if (this.currencyDetails.fromDisable)
        this.converterForm.controls.fromCur.disable();
      this.pageTitle = this.currencyDetails?.fromCur + ' - ' + this.exchangeRate.getCurrencyDetails(this.currencyDetails?.fromCur)[0]?.name;
    }
    this.currecyExchangeRates();
    this.getCurrencyList();
  }

  /**
   * Function to fetch exchanges rate of a currency against a base currency
   */
  currecyExchangeRates() {
    this.subscription.add(
      this.exchangeRate.getRates(this.converterForm.controls.fromCur.value, this.converterForm.controls.toCur.value).subscribe(data => {
        let res = JSON.parse(JSON.stringify(data)).result;
        this.currentRate = parseFloat(res[Object.keys(res)[0]]).toFixed(4);
        this.convert();
      })
    );
    this.sharedService.setSharedData(
      {
        fromCur: this.converterForm.controls.fromCur.value,
        amount: this.converterForm.controls.amount.value,
        toCur: this.converterForm.controls.toCur.value
      }
    );
  }

  /**
   * Function to call api to fetch all the currency codes and names
   */
  getCurrencyList() {
    this.currencyList = this.exchangeRate.getAllCurrencyNames();
  }

  /**
   * Function to convert the amount to target currency
   */
  convert() {
    let amt = this.converterForm.controls.amount.value;
    this.result = ((amt ? amt : this.defaultAmt) * parseFloat(this.currentRate)).toFixed(3);
  }

  /**
   * Function to swap currency from to to and to to from.
   */
  swapCurrency() {
    let from = this.converterForm.controls.fromCur.value;
    this.converterForm.controls.fromCur.setValue(this.converterForm.controls.toCur.value);
    this.converterForm.controls.toCur.setValue(from);
    this.currecyExchangeRates();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
