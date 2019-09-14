import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaleComponent } from './@_pages/sale/sale.component';
import { DefaultComponent } from './@_pages/default/default.component';
import { LoginComponent } from './@_pages/login/login.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SalesTableComponent } from './@_components/sales-table/sales-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SaleComponent,
    DefaultComponent,
    LoginComponent,
    SalesTableComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }