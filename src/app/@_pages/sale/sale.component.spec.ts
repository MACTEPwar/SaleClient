import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleComponent } from './sale.component';
import { SalesTableComponent } from 'src/app/@_components/sales-table/sales-table.component';
import { MalihuScrollbarService, MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from 'src/app/@_shared/app-config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'src/app/@_modules/modal/modal.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleComponent,SalesTableComponent ],
      imports: [MalihuScrollbarModule,HttpClientModule,ModalModule,RouterTestingModule],
      providers:[MalihuScrollbarService,{
        provide: APP_INITIALIZER,
        multi: true,
        deps: [AppConfigService],
        useFactory: (appConfigService: AppConfigService) => {
          return () => {
            return appConfigService.loadAppConfig();
          };
        }
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
