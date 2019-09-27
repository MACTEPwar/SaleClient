import { IProduct } from '../@_interfaces/IProduct';

export class Product implements IProduct{
    //Code:number;
    Title:string;
    Price: number;
    Count: number;
    Discount: number;
    Unit: string;

    constructor(Title:string,Price:number,Count:number,Discount:number,Unit:string){
        //this.Code = c;
        this.Title = Title;
        this.Price = Price;
        this.Count = Count;
        this.Discount = Discount;
        this.Unit = Unit;
    }
}