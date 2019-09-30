import { Injectable } from '@angular/core';
import { Product } from 'src/app/@_models/Product';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { DebugService } from '../logs/debug.service';
import { Response } from 'src/app/@_models/Response';
import { ReceiptService } from '../receipt/receipt.service';
import { DefaultResult } from 'src/app/@_models/DefaultResult';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 

  constructor(
    private apiService: ApiService,
    private receiptService:ReceiptService
    ) { }

  // GetTestProducts(): Array<Product> {
  //   for (let i = 0; i < 20; i = i + 1) {
  //     this.Products.push(new Product(111, "Картошка" + i, i, parseInt((i * 0.6).toFixed(2)), 0, "кг"));
  //   }
  //   return this.Products;
  // }

  //TODO need delete this
  GetTestProducts(){return null};

  // addProductToList(product:Product){
  //   this.Products.push(product);
  // }


  getAmountString(product:Product):string{
    if (product.Measure  != 0){
      return product.Amount.toFixed(3);
    }
    return product.Amount.toFixed(0);
  }

  //TODO переделать
  async changeProductAmount(position:number,value:number):Promise<DefaultResult>{
    let changeProductAmount = await this.apiService.SendComand('ChangeProductAmount',[{Position:position},{Value:value}]).toPromise();
    DebugService.WriteInfo(`changeProductAmount = ${JSON.stringify(changeProductAmount,null,4)}`);
    return new DefaultResult(true,null);
  }
  

  async isAdditionalWeight(bar,price:number):Promise<Response>{
    let isAdditionalWeight = await this.apiService.SendComand("IsAdditionalWeight",[{Bar:bar},{Price:price}]).toPromise();
    DebugService.WriteInfo(`isAdditionalWeight = ${JSON.stringify(isAdditionalWeight,null,4)}`);
    return isAdditionalWeight;
  }

  async isCanOpenReceipt(): Promise<Response> {
    let isCanOpenReceipt = await this.apiService.SendComand("IsCanOpenReceipt").toPromise() as Response;
    DebugService.WriteInfo(`isCanOpenReceipt = ${JSON.stringify(isCanOpenReceipt, null, 4)}`);
    return new Response(isCanOpenReceipt.ProtocolIsComlete, isCanOpenReceipt.ProtocolMessage, isCanOpenReceipt.GValue, isCanOpenReceipt.GMessage);
  }

  async checkForbiddenBar(barcode:string):Promise<Response>{
    let checkForbiddenBar = await this.apiService.SendComand('CheckForbiddenBar',barcode).toPromise() as Response; 
    DebugService.WriteInfo(`checkForbiddenBar = ${JSON.stringify(checkForbiddenBar,null,4)}`);
    return checkForbiddenBar;
  }

  async checkForbiddenTaxgroup(barcode:string):Promise<Response>{
    let checkForbiddenTaxgroup = await this.apiService.SendComand('CheckForbiddenTaxgroup',barcode).toPromise() as Response; 
    DebugService.WriteInfo(`checkForbiddenBar = ${JSON.stringify(checkForbiddenTaxgroup,null,4)}`);
    return checkForbiddenTaxgroup;
  }

  async isAddProductByEntry(barcode,price,amount):Promise<Response>{
    let isAddProductByEntry = await this.apiService.SendComand("IsAddProductByEntry",[{Bar:barcode},{Price:price},{Amount:amount}]).toPromise();
    DebugService.WriteInfo(`isAddProductByEntry = ${JSON.stringify(isAddProductByEntry,null,4)}`);
    return isAddProductByEntry;
  }

  async firstStep(code:string) {
    let stradp = await this.apiService.SendComand('SaveTempReceiptAndDisplayProduct').toPromise();
    let barcodeAmount = this.tempResponseGetParseBarcode(code);
    //getParseBarcode не работает
    DebugService.WriteInfo(`barcodeAmount = ${JSON.stringify(barcodeAmount, null, 4)}`);
    let barcode = barcodeAmount.GValue.Barcode;
    let amount = barcodeAmount.GValue.Amount;
    let ppDTO = await this.apiService.SendComand('GetPureProductInReceiptByBar ', barcode).toPromise();
    // let ppDTO = this.tempGetPureProductInReceiptByBar();
    DebugService.WriteInfo(`ppDTO = ${JSON.stringify(ppDTO, null, 4)}`);
    return { amount: amount, barcode: barcode, ppDTO: ppDTO };
  }

  async getListPureProductByEntryCode(barcode:string):Promise<Response>{
    let getListPureProductByEntryCode = await this.apiService.SendComand('GetListPureProductByEntryCode', barcode).toPromise();
    DebugService.WriteInfo(`getListPureProductByEntryCode = ${JSON.stringify(getListPureProductByEntryCode,null,4)}`);
    return getListPureProductByEntryCode;
  }

  async getPureProductsByArticle(article):Promise<Response>{
    let getPureProductsByArticle = await this.apiService.SendComand("GetPureProductsByArticle",article).toPromise();
    DebugService.WriteInfo(`getPureProductsByArticle = ${JSON.stringify(getPureProductsByArticle,null,4)}`);
    return getPureProductsByArticle;
  }

  async getScale(amount): Promise<Response> {
    let IsScalesPresent = await this.apiService.SendComand("IsScalesPresent").toPromise();
    DebugService.WriteInfo(`IsScalesPresent = ${JSON.stringify(IsScalesPresent, null, 4)}`);
    if (IsScalesPresent.GValue) {
      DebugService.WriteInfo(`if (IsScalesPresent.GValue)`);
      var getWeightFromScales = await this.apiService.SendComand("GetWeightFromScales").toPromise();
      if (!getWeightFromScales.ProtocolIsComlete) {
        DebugService.WriteInfo(`if (!getWeightFromScales.ProtocolIsComlete)`);
        return new Response(false, getWeightFromScales.ProtocolMessage, null, null);
      }
      amount = getWeightFromScales.GValue;
      return new Response(true, null, { amount: amount }, null);
    }
    else {
      DebugService.WriteInfo(`else (!getWeightFromScales.ProtocolIsComlete)`)
      // TODO
      return new Response(true, null, { result: "dialog" }, "Введите количество");
    }
  }

  tempResponseGetParseBarcode(code:string) {
    DebugService.WriteInfo(`Получил тестовый ResponseGetParseBarcode`);
    return { GValue: { Barcode: "103", Amount: 0.0 }, GMessage: null };
  }

  tempCheckForbiddenTaxgroup() {
    DebugService.WriteInfo(`Получил тестовый CheckForbiddenTaxgroup`);
    return { "GValue": true, "GMessage": null };
  }

  tempGetPureProductInReceiptByEntryCode() {
    DebugService.WriteInfo(`Получил тестовый GetPureProductInReceiptByEntryCode`);
    return { GValue: [{ Article: 102, FullName: "Кофе", ShortName: "Кофе", Taxgroup: 3, IsLimit: 0, Measure: 1, Bar: "102", Dtype: 0, Price: 9999.99, AmountLimit: 0.000, AmountDefault: 0.000, BackInfo: "" }], GMessage: "" };
  }

  tempGetPureProductInReceiptByBar() {
    DebugService.WriteInfo(`Получил тестовый GetPureProductInReceiptByEntryCode`);
    // return { GValue: { Article: 103, FullName: "Кофе", ShortName: "Кофе", Taxgroup: 3, IsLimit: 0, Measure: 1, Bar: "103", Dtype: 0, Price: 9999.99, AmountLimit: 0.000, AmountDefault: 0.000, BackInfo: "" }, GMessage: "" };
    return {GValue:{MeasureEd:0,MeasureKg:1,Articel:103,FullName: "Кофе", ShortName: "Кофе", Taxgroup: 3, IsLimit: 0, Measure: 1, Bar: "103", Dtype: 0, Price: 9999.99, AmountLimit: 0.000, AmountDefault: 0.000,Amount:10,DiscountSum:4,Sum:10,SumWODiscount:4,MeasureName:"кг",ArticlePosReturn:103},GMessage:""};
  }

  tempIsAdditionalWeight() {
    DebugService.WriteInfo(`Получил тестовый tempIsAdditionalWeight`);
    return { GValue: false, GMessage: null };
  }

  tempCheckForbiddenBar(bar:string){
    return { GValue: true, GMessage: null };
  }
}


