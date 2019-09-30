import { Product } from './Product';

export class Receipt{
    ReturnReceiptType:number;
    KassirName:string;
    Number:number;
    Type:number;
    Products:Array<Product>;
    Sum:number;

    constructor(){
        this.Products = new Array<Product>();
    }
}