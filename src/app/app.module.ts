import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ConverterPanelComponent } from './converter-panel/converter-panel.component';
import { HeaderComponent } from './header/header.component';
import { CardsGridComponent } from './home/cards-grid/cards-grid.component';
import { ChartComponent } from './details/chart/chart.component';
import { CEAInterceptorService } from './api/cea-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    ConverterPanelComponent,
    HeaderComponent,
    CardsGridComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CEAInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
