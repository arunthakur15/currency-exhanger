import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Currency } from 'currencies.json';
import { Subscription } from 'rxjs';
import { CurrencyExchangeService } from '../api/currency-exchange.service';

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {
  currentRate: string = '';
  currencyList: Currency[]= [];
  converterForm: FormGroup;
  result: string;
  private subscription = new Subscription();
  constructor(private exchangeRate: CurrencyExchangeService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.converterForm = this.fb.group({
      fromCur: ['EUR'],
      toCur: ['USD'],
      amount:[1],
    })
    this.currecyExchangeRates();
    this.getCurrencyList();
  }

  currecyExchangeRates() {
    this.subscription.add(
      this.exchangeRate.getRates(this.converterForm.controls.fromCur.value, this.converterForm.controls.toCur.value).subscribe(data => {
        this.currentRate = parseFloat(data[Object.keys(data)[0]]).toFixed(4);
        this.result = '';
      })
    )
  }

  getCurrencyList() {
    //console.log(this.exchangeRate.getAllCurrencyNames());
    this.currencyList = this.exchangeRate.getAllCurrencyNames();
  }

  convert(){
    this.result = (this.converterForm.controls.amount.value * parseFloat(this.currentRate)).toFixed(3);
  }

  swapCurrency(){
    let from = this.converterForm.controls.fromCur.value;
    this.converterForm.controls.fromCur.setValue(this.converterForm.controls.toCur.value);
    this.converterForm.controls.toCur.setValue(from);
    this.currecyExchangeRates();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
