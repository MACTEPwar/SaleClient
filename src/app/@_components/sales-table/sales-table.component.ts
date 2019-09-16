import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/@_models/Product';
import { ProductService } from 'src/app/@_core/product/product.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

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

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(private productService: ProductService,private mScrollbarService: MalihuScrollbarService) { }

  ngOnInit() {
    this.Products = this.productService.GetTestProducts();
  }
  ngAfterViewInit(){

    this.mScrollbarService.initScrollbar($(".dataTables_scrollBody"), {axis: 'y', theme: 'dark'});


    // настраиваю скроллбар
    $(".dataTables_scrollBody .mCSB_dragger_bar").css("width","100%").addClass("bg-standart");
    $(".dataTables_scrollBody .mCSB_inside > .mCSB_container").css("margin-right","40px");
    $(".dataTables_scrollBody .mCSB_scrollTools").css("width","36px");
    //end
  }

}
