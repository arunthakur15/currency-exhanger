import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  fromCur: string;
  toCur: string;
  fromDisable: boolean;
  currencyDetails: {};
  toDisable: boolean;
  private subscription = new Subscription();
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    /**
     * Subscription added to read the query parameters for currency details
     */
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.fromCur = params.fromCur;
        this.toCur = params.toCur;
        this.fromDisable = params.fromDisable;
        this.toDisable = params.toDisable;
      }));


    this.currencyDetails = {
      fromCur: this.fromCur,
      toCur: this.toCur,
      fromDisable: this.fromDisable,
      toDisable: this.toDisable
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
