import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductComponent } from './search-product.component';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';
import { NumericKeyboardModule } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.module';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { DebugService } from 'src/app/@_core/logs/debug.service';
import { ProductService } from 'src/app/@_core/product/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('SearchProductComponent', () => {
  let component: SearchProductComponent;
  let fixture: ComponentFixture<SearchProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProductComponent ],
      imports:[NumericKeyboardModule,HttpClientModule],
      providers:[ModalContext,ApiService,DebugService,ProductService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
