import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/@_models/Product';
import { ProductService } from 'src/app/@_core/product/product.service';

declare var $:any;


@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements OnInit,AfterViewInit {

  @ViewChild('thead',{static:true}) thead_DataTable:ElementRef;
  @ViewChild('tbody',{static:true}) tbody_DataTable:ElementRef;

  Products:Array<Product>;

  public scrollbarOptions = { axis: 'y', theme: 'dark',scrollButtons:{ enable: true } };

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.Products = this.productService.GetTestProducts();
  }
  ngAfterViewInit(){
    // настраиваю скроллбар
    $(".dataTables_scrollBody .mCSB_dragger_bar").css("width","100%");
    //$(".dataTables_scrollBody .mCSB_buttonUp").css("background-image","url(https://www.fourjay.org/myphoto/f/7/72306_up-arrow-png.png)");
    
    //end
  }

}
