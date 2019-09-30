import { Injectable, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { DebugService } from '../logs/debug.service';
import { ProductService } from '../product/product.service';
import { Product } from 'src/app/@_models/Product';
import { FiscalService } from '../fiscal/fiscal.service';
import { DefaultResult } from 'src/app/@_models/DefaultResult';
import { Response } from 'src/app/@_models/Response';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { AlertModalComponent } from 'src/app/@_components/modal-windows/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from 'src/app/@_components/modal-windows/confirm-modal/confirm-modal.component';
import { Receipt } from 'src/app/@_models/Receipt';

@Injectable({
  providedIn: 'root'
})

export class ReceiptService {

  Receipt: Receipt;
  WarningMessageFromFiscal: string;

  constructor(
    private apiService: ApiService,
    private fiscalService: FiscalService,
    private modalService: ModalService
  ) {
    this.Receipt = new Receipt();
  }


  //Products: Array<Product> = new Array<Product>();

  //TODO сделать как нужно
  async doAnulReceipt(): Promise<DefaultResult> {
    let doAnulReceipt: Response = await this.apiService.SendComand("DoAnulReceipt").toPromise();
    DebugService.WriteInfo(`doAnulReceipt = ${JSON.stringify(doAnulReceipt, null, 4)}`);
    if (doAnulReceipt.ProtocolIsComlete || doAnulReceipt.GValue) {
      this.refreshProductList();
      return new DefaultResult(true, null);
    }
    else {
      return new DefaultResult(false, doAnulReceipt.ProtocolIsComlete ? doAnulReceipt.GMessage : doAnulReceipt.ProtocolMessage);
    }
  }

  isCanBeginAnulate() {
    return this.Receipt.Products.length > 0;
  }

  async isCanAnulate(type: number): Promise<DefaultResult> {
    let getWarningFromFiscal: DefaultResult = await this.fiscalService.getWarningFromFiscal();
    this.WarningMessageFromFiscal = getWarningFromFiscal.Message;

    let isCanAnulate: Response = type === 1 ? await this.apiService.SendComand('IsCanAnullate').toPromise() : await this.apiService.SendComand('IsCanAnullateSecond').toPromise();
    DebugService.WriteInfo(`isCanAnulate = ${JSON.stringify(isCanAnulate, null, 4)}`);
    if (isCanAnulate.GValue) {
      return new DefaultResult(true, null);
    }
    else {
      return new DefaultResult(false, isCanAnulate.GMessage);
    }
  }


  //GetReceiptWorked
  async refreshProductList(): Promise<any> {
    //TODO change type from Receipt to Recponse
    let getReceiptWorked:Receipt = await this.apiService.SendComand("GetReceiptWorked").toPromise();
    DebugService.WriteInfo(`GetReceiptWorked = ${JSON.stringify(getReceiptWorked, null, 4)}`);

    this.Receipt.KassirName = getReceiptWorked.KassirName;
    this.Receipt.Number = getReceiptWorked.Number;
    this.Receipt.ReturnReceiptType = getReceiptWorked.ReturnReceiptType;
    this.Receipt.Sum = getReceiptWorked.Sum;
    this.Receipt.Type = getReceiptWorked.Type;

    //TODO исправить, когда Юра поправит
    //if (getReceiptWorked.ProtocolIsComlete){
    //TODO исправить, когда Юра поправит
    // this.Products = new Array<Product>();
    this.Receipt.Products.length = 0;
    (getReceiptWorked as any).Products.forEach((element:Product, ind) => {
      this.Receipt.Products.push(new Product(element.Article,element.FullName,element.ShortName,element.Taxgroup,element.IsLimit,element.Measure,element.Bar,element.Dtype,element.Price,element.AmountLimit,element.AmountDefault,element.Amount,element.DiscountSum,element.Sum,element.SumWODiscount,element.MeasureName,element.ArticlePosReturn, ind + 1));
    });
    return { result: true, message: null };
    // }
    // else{
    //   return {result:false,message:getReceiptWorked.ProtocolMessage};
    // }
  }
}
