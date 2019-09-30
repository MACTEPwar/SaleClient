import { IProduct } from '../@_interfaces/IProduct';

export class Product implements IProduct {
    Id: number;
    Article: number;
    FullName: string;
    ShortName: string;
    Taxgroup: string;
    IsLimit: number;
    Measure: number;
    Bar: string;
    Dtype: number;
    Price: number;
    AmountLimit: number;
    AmountDefault: number;
    Amount: number;
    DiscountSum: number;
    Sum: number;
    SumWODiscount: number;
    MeasureName: string;
    ArticlePosReturn: number;


    constructor(
        Article: number,
        FullName: string,
        ShortName: string,
        Taxgroup: string,
        IsLimit: number,
        Measure: number,
        Bar: string,
        Dtype: number,
        Price: number,
        AmountLimit: number,
        AmountDefault: number,
        Amount: number,
        DiscountSum: number,
        Sum: number,
        SumWODiscount: number,
        MeasureName: string,
        ArticlePosReturn: number,
        Id:number = null
    ) {
        this.Article = Article;
        this.FullName = FullName;
        this.ShortName = ShortName;
        this.Taxgroup = Taxgroup;
        this.IsLimit = IsLimit;
        this.Measure = Measure;
        this.Bar = Bar;
        this.Dtype = Dtype;
        this.Price = Price;
        this.AmountLimit = AmountLimit;
        this.AmountDefault = AmountDefault;
        this.Amount = Amount;
        this.DiscountSum = DiscountSum;
        this.Sum = Sum;
        this.SumWODiscount = SumWODiscount;
        this.MeasureName = MeasureName;
        this.ArticlePosReturn = ArticlePosReturn;
        this.Id = Id;
    }
}