import { Injectable } from '@angular/core';
import { Product } from 'src/app/@_models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Products:Array<Product> = new Array<Product>();

  constructor() { }

  GetTestProducts():Array<Product>{
    for(let i = 0 ; i < 20; i = i + 1){
      this.Products.push(new Product(111, "Картошка" + i, i, parseInt((i * 0.6).toFixed(2)), 0, "кг"));
    }
    return this.Products;
  }
}
