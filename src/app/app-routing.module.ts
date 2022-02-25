import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'details', component: DetailsComponent, pathMatch: 'full'
  },
  {
    path: 'details/EUR_USD', component: DetailsComponent, pathMatch: 'full'
  },
  {
    path: 'details/EUR_GBP', component: DetailsComponent, pathMatch: 'full'
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
