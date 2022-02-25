import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/api/currency-exchange.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/utils/shared-service.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  private subscription = new Subscription();
  fromCur:string;
  toCur:string;

  @Input() currencyData;


  public chartOptions: ChartOptions  = {
    responsive: true,
  };
  public chartLabels: Label[] =  [];
  public chartType: ChartType = 'bar';
  public chartLegend = true;
  public chartPlugins = [];

  public chartData: ChartDataSets[] = [
    { data: [], label: '' },
  ];

  public chartColors: Color[] = [
    {
      borderColor: '#ccc',
      backgroundColor: '#0f0',
    },
  ];
  constructor(private exchangeRate: CurrencyExchangeService, 
    private datepipe: DatePipe, 
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.fromCur = this.currencyData?.fromCur;
    this.toCur = this.currencyData?.toCur;
    
    this.getHistoricalData();

    this.subscription.add(
    this.sharedService.getSharedData$.subscribe(data => {
      this.fromCur = data.fromCur;
      this.toCur = data.toCur;
      this.getHistoricalData();
    }));
  }

  getHistoricalData(){
    let aDate = new Date();
    aDate.setDate(aDate.getDate() - 12);
    let date = this.datepipe.transform(aDate, 'yyyy-MM-dd');
    this.subscription.add(
    this.exchangeRate.getHistoricalData(date,this.fromCur,this.toCur).subscribe(data => {
      let amt = parseFloat(parseFloat(data.results[Object.keys(data.results)[0]]).toFixed(4));
      this.chartData[0].data.push(amt);
      this.chartData[0].label = Object.keys(data.results)[0];
      let month = this.datepipe.transform(aDate,'MMMM');
      if(!this.chartLabels.includes(month))
      this.chartLabels.push(this.datepipe.transform(aDate,'MMMM'));
    }));
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
