import { IProduct } from '../@_interfaces/IProduct';

export class Product implements IProduct{
    Code:number;
    Title:string;
    Price: number;
    Count: number;
    Discount: number;
    Unit: string;

    constructor(c:number,t:string,p:number,co:number,d:number,u:string){
        this.Code = c;
        this.Title = t;
        this.Price = p;
        this.Count = co;
        this.Discount = d;
        this.Unit = u;
    }
}