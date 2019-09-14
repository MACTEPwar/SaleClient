import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/@_models/Product';
import { ProductService } from 'src/app/@_core/product/product.service';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements OnInit,AfterViewInit {

  @ViewChild('thead',{static:true}) thead_DataTable:ElementRef;
  @ViewChild('tbody',{static:true}) tbody_DataTable:ElementRef;

  Products:Array<Product>

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.Products = this.productService.GetTestProducts();

   

  }
  ngAfterViewInit(){
     //console.log(this.thead_DataTable.nativeElement);

    //  let s = this.thead_DataTable.nativeElement.querySelectorAll('th');
    //  let f = this.tbody_DataTable.nativeElement.querySelectorAll('td');
 
    //  console.log(f);
    //    console.log(s);
 
    //  s.forEach(function(ind,el){
    //    el.style.width = f[ind].style.width + "px";
    //  });
     //console.log(s[0].style.width = "200px");
  }

}
