import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleComponent } from './@_pages/sale/sale.component';
import { DefaultComponent } from './@_pages/default/default.component';
import { LoginComponent } from './@_pages/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "sale", component: SaleComponent },
  { path: "**", component: DefaultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
