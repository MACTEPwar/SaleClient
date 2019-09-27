import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTableComponent } from './sales-table.component';
import { MalihuScrollbarModule, MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { HttpClientModule } from '@angular/common/http';
//import * as $ from 'node_modules/jquery';
//declare var $:any;


describe('SalesTableComponent', () => {
  let component: SalesTableComponent;
  let fixture: ComponentFixture<SalesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTableComponent],
      imports:[MalihuScrollbarModule, HttpClientModule],
      providers:[MalihuScrollbarService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
