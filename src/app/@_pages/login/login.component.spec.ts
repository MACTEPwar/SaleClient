import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NumericKeyboardModule } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.module';
import { NumericKeyboardService } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent as LoginModal } from 'src/app/@_components/modal-windows/login/login.component';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';
import { ModalModule } from 'src/app/@_modules/modal/modal.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SaleComponent } from '../sale/sale.component';
import { DefaultComponent } from '../default/default.component';
import { SalesTableComponent } from 'src/app/@_components/sales-table/sales-table.component';
import { MalihuScrollbarModule, MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent,LoginModal,SaleComponent,DefaultComponent,SalesTableComponent],
      imports:[NumericKeyboardModule, HttpClientModule,ModalModule,AppRoutingModule,MalihuScrollbarModule,RouterTestingModule],
      providers:[NumericKeyboardService,ModalService,AuthorizeService,MalihuScrollbarService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
