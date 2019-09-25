import { Injectable } from '@angular/core';
import { Product } from 'src/app/@_models/Product';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { Test } from 'src/app/@_models/Test';
import { DebugService } from '../logs/debug.service';
import { Response } from 'src/app/@_models/Response';
import { CustomResponse } from 'src/app/@_models/CustomResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Products: Array<Product> = new Array<Product>();

  constructor(private apiService: ApiService, private debugService: DebugService) { }

  GetTestProducts(): Array<Product> {
    for (let i = 0; i < 20; i = i + 1) {
      this.Products.push(new Product(111, "Картошка" + i, i, parseInt((i * 0.6).toFixed(2)), 0, "кг"));
    }
    return this.Products;
  }

  // async AddProduct(code:string){

  // }

  // async ProcessEntryCode(code: string, test: boolean = false): Promise<any> {
  //   let isCanOpenReceipt = await this.apiService.SendComand("isCanOpenReceipt").toPromise();
  //   if (test) console.log(isCanOpenReceipt);

  //   let result = false;

  //   if (true) {
  //     let stradp = await this.apiService.SendComand('SaveTempReceiptAndDisplayProduct').toPromise();
  //     let barcodeAmount = await this.apiService.SendComand('GetParseBarcode', code).toPromise();
  //     let barcode = barcodeAmount.GValue.Barcode;
  //     let amount = barcodeAmount.GValue.Amount;
  //     let ppDTO = await this.apiService.SendComand('GetPureProductInReceiptByEntryCode', barcode).toPromise();
  //     let pureProductViewModel = ppDTO.GValue;
  //     if (pureProductViewModel === null) {
  //       let getPricesByEntryCode = await this.apiService.SendComand('GetListPureProductByEntryCode', barcode).toPromise();
  //       if (getPricesByEntryCode.GValue.Count > 1) {

  //       }
  //     }
  //   }
  // }
  async ProcessEntryCode(code: string, scale: boolean = false): Promise<CustomResponse> {
    let isCanOpenReceipt = await this.isCanOpenReceipt();
    if (!isCanOpenReceipt.GValue) {
      DebugService.WriteInfo("if (!isCanOpenReceipt.GValue)");
      return {
        GValue: false,
        GMessage: isCanOpenReceipt.GMessage,
        RValue: {
          result: false,
          listPrices: null,
          amount: null
        },
        ProtocolIsComlete: true,
        ProtocolMessage: null
      };
    }
    let stradp = await this.apiService.SendComand('SaveTempReceiptAndDisplayProduct').toPromise();
    let barcodeAmount = this.tempResponseGetParseBarcode(code);
    DebugService.WriteInfo(`barcodeAmount = ${JSON.stringify(barcodeAmount, null, 4)}`);
    let barcode = barcodeAmount.GValue.Barcode;
    let amount = barcodeAmount.GValue.Amount;
    let ppDTO = await this.apiService.SendComand('GetPureProductInReceiptByBar', barcode).toPromise();
    DebugService.WriteInfo(`ppDTO = ${JSON.stringify(ppDTO, null, 4)}`);
    let pureProductViewModel = ppDTO.GValue;
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
    DebugService.WriteInfo(`checkForbiddenBar = ${JSON.stringify(isAddProductByEntry,null,4)}`);
    return isAddProductByEntry;
  }

  async stepN1(code:string) {
    let stradp = await this.apiService.SendComand('SaveTempReceiptAndDisplayProduct').toPromise();
    let barcodeAmount = this.tempResponseGetParseBarcode(code);
    DebugService.WriteInfo(`barcodeAmount = ${JSON.stringify(barcodeAmount, null, 4)}`);
    let barcode = barcodeAmount.GValue.Barcode;
    let amount = barcodeAmount.GValue.Amount;
    // let ppDTO = await this.apiService.SendComand('GetPureProductInReceiptByBar ', barcode).toPromise();
    let ppDTO = this.tempGetPureProductInReceiptByBar();
    DebugService.WriteInfo(`ppDTO = ${JSON.stringify(ppDTO, null, 4)}`);
    return { amount: amount, barcode: barcode, ppDTO: ppDTO };
    //let pureProductViewModel = ppDTO.GValue;
  }

  async ProcessEntryCodeStep1(code: string, test: boolean = false): Promise<any> {
    let isCanOpenReceipt = await this.apiService.SendComand("IsCanOpenReceipt").toPromise();
    DebugService.WriteInfo(`isCanOpenReceipt = ${JSON.stringify(isCanOpenReceipt, null, 4)}`);
    if (!isCanOpenReceipt.GValue) {
      DebugService.WriteInfo("if (!isCanOpenReceipt.GValue)");
      return { result: false, message: isCanOpenReceipt.GMessage, listPrices: null, amount: null };
    }
    let stradp = await this.apiService.SendComand('SaveTempReceiptAndDisplayProduct').toPromise();
    //let barcodeAmount = await this.apiService.SendComand('GetParseBarcode', code).toPromise();
    let barcodeAmount = this.tempResponseGetParseBarcode(code);
    DebugService.WriteInfo(`barcodeAmount = ${JSON.stringify(barcodeAmount, null, 4)}`);
    let barcode = barcodeAmount.GValue.Barcode;
    let amount = barcodeAmount.GValue.Amount;
    let ppDTO = await this.apiService.SendComand('GetPureProductInReceiptByBar', barcode).toPromise();
    DebugService.WriteInfo(`ppDTO = ${JSON.stringify(ppDTO, null, 4)}`);
    let pureProductViewModel = ppDTO.GValue;
    if (pureProductViewModel === null) {
      DebugService.WriteInfo("if (pureProductViewModel === null)");
      //Internal service error! Connection is not open
      // let getPricesByEntryCode = await this.apiService.SendComand('GetListPureProductByEntryCode', barcode).toPromise();
      let getPricesByEntryCode = this.tempGetPureProductInReceiptByEntryCode();
      DebugService.WriteInfo(`getPricesByEntryCode = ${JSON.stringify(getPricesByEntryCode, null, 4)}`);
      if (getPricesByEntryCode.GValue.length > 1) {
        DebugService.WriteInfo("if (getPricesByEntryCode.GValue.length > 1)");
        return { result: true, message: "", listPrices: getPricesByEntryCode, amount: amount };
      }
      else if (getPricesByEntryCode.GValue.length === 1) {
        DebugService.WriteInfo("else if (getPricesByEntryCode.GValue.length === 1)");
        return { result: true, message: "", listPrices: getPricesByEntryCode, amount: amount };
      }
      else {
        DebugService.WriteInfo("else (getPricesByEntryCode.GValue.length > 1)");
        return { result: false, message: getPricesByEntryCode.GMessage, listPrices: null, amount: null };
      }
    }
  }

  async getListPureProductByEntryCode(barcode:string):Promise<Response>{
    let getListPureProductByEntryCode = await this.apiService.SendComand('GetListPureProductByEntryCode', barcode).toPromise();
    DebugService.WriteInfo(`getListPureProductByEntryCode = ${JSON.stringify(getListPureProductByEntryCode,null,4)}`);
    return getListPureProductByEntryCode;
  }

  async GetScale(amount): Promise<Response> {
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

  async ProcessEntryCodeStep2(code: string, amount, pureProductViewModel): Promise<Response> {
    DebugService.WriteInfo([`code = ${code}`, `amount = ${amount}`, { pureProductViewModel: pureProductViewModel }]);

    if (pureProductViewModel.Price === 0.00) {
      DebugService.WriteInfo("if (pureProductViewModel.Price === 0.00)");
      return new Response(true, "", { result: false }, "Нулевая цена на товар!");
    }

    // let checkForbiddenTax = await this.apiService.SendComand("CheckForbiddenTaxgroup", pureProductViewModel.Taxgroup).toPromise();
    let checkForbiddenTax = this.tempCheckForbiddenTaxgroup();
    DebugService.WriteInfo(`checkForbiddenTax = ${JSON.stringify(checkForbiddenTax, null, 4)}`);
    if (!checkForbiddenTax.GValue) {
      DebugService.WriteInfo("if (!checkForbiddenTax.GValue)");
      return new Response(true, "", { result: false }, checkForbiddenTax.GMessage + ". " + pureProductViewModel.Bar);
    }
    // let IsAdditionalWeight = await this.apiService.SendComand("IsAdditionalWeight",[{"Bar":code},{"Price":pureProductViewModel.Price}]).toPromise();
    let IsAdditionalWeight = this.tempIsAdditionalWeight();
    DebugService.WriteInfo(`IsAdditionalWeight = ${JSON.stringify(IsAdditionalWeight, null, 4)}`);
    if (IsAdditionalWeight.GValue) {
      DebugService.WriteInfo(`if (IsAdditionalWeight.GValue)`);
      return this.GetScale(amount);
    }
    //TODO remake this
    return new Response(true, null, { result: "next" }, null);
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
    return { GValue: [{ Article: 103, FullName: "Кофе", ShortName: "Кофе", Taxgroup: 3, IsLimit: 0, Measure: 1, Bar: "103", Dtype: 0, Price: 9999.99, AmountLimit: 0.000, AmountDefault: 0.000, BackInfo: "" }], GMessage: "" };
  }

  tempGetPureProductInReceiptByBar() {
    DebugService.WriteInfo(`Получил тестовый GetPureProductInReceiptByEntryCode`);
    return { GValue: { Article: 103, FullName: "Кофе", ShortName: "Кофе", Taxgroup: 3, IsLimit: 0, Measure: 1, Bar: "103", Dtype: 0, Price: 9999.99, AmountLimit: 0.000, AmountDefault: 0.000, BackInfo: "" }, GMessage: "" };
  }

  tempIsAdditionalWeight() {
    DebugService.WriteInfo(`Получил тестовый tempIsAdditionalWeight`);
    return { GValue: false, GMessage: null };
  }

  tempCheckForbiddenBar(bar:string){
    return { GValue: true, GMessage: null };
  }

  // async isCanOpenReceipt():Promise<boolean>{
  //   return await this.apiService.SendComand("isCanOpenReceipt").toPromise();
  // }  

  // async SaveTempReceiptAndDisplayProduct():Promise<any>{
  //   return await this.apiService.SendComand('SaveTempReceiptAndDisplayProduct').toPromise();
  // }
}


