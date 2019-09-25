import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';
import { NumericKeyboardService } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.service';
import { ProductService } from 'src/app/@_core/product/product.service';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { Test } from 'src/app/@_models/Test';
import { DebugService } from 'src/app/@_core/logs/debug.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, AfterViewInit {

  errorMessage = "";

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    public context: ModalContext<any>,
    private numericKeyboardService: NumericKeyboardService,
    private productService: ProductService,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let input = this.input.nativeElement as HTMLInputElement;
    this.numericKeyboardService.registerViewContainer(input);
  }

  async onSelected(value: boolean) {
    //await this.test(this.input.nativeElement.value);
    console.log(await this.ProcessEntryCode(this.input.nativeElement.value));
  }

  //TODO: какая-то дичь
  async test(code: string) {
    let getPricesByEntryCode = await this.productService.ProcessEntryCodeStep1(code);
    //console.log(getPricesByEntryCode);
    if (getPricesByEntryCode.result) {
      if (getPricesByEntryCode.listPrices.length > 1) {
        // TODO: показываю диалог
      }

      let step2 = await this.productService.ProcessEntryCodeStep2(code, getPricesByEntryCode.amount, getPricesByEntryCode.listPrices.GValue[0]);
      if (!step2.ProtocolIsComlete) {
        //TODO: показать сообщение "повторить?"
        let scale = await this.productService.GetScale((step2.GValue as any).amount);
      }
      else {
        let s2Val = step2.GValue as any;
        if (s2Val.result === "next") {
          DebugService.WriteInfo(`if (s2Val.result === "next")`);
        }
        else if (s2Val.result === "dialog") {
          DebugService.WriteInfo(`if (s2Val.result === "dialog")`);
        }
      }
    }
    else {
      this.errorMessage = getPricesByEntryCode.message;
    }
  }

  async ProcessEntryCode(code: string): Promise<boolean> {
    let amount = null;
    let barcode = null;
    let result = false;

    let isCanOpenReceipt = await this.productService.isCanOpenReceipt();
    if (!isCanOpenReceipt.GValue) {
      //TODO display error dialog
      return false;
    }
    let stepN1 = await this.productService.stepN1(code);

    amount = stepN1.amount;
    barcode = stepN1.barcode;

    var pureProductViewModel = stepN1.ppDTO.GValue;
    if (stepN1.ppDTO === null) {
      let getPricesByEntryCode = await this.productService.getListPureProductByEntryCode(barcode);

      if ((getPricesByEntryCode.GValue as any).length > 1) {
        DebugService.WriteInfo("if (getPricesByEntryCode.GValue.length > 1)");
        //TODO select one product
        pureProductViewModel = getPricesByEntryCode.GValue[0];
      }
      else if ((getPricesByEntryCode.GValue as any).length === 1) {
        DebugService.WriteInfo("else if (getPricesByEntryCode.GValue.length === 1)");
        //TODO select first product
        pureProductViewModel = getPricesByEntryCode.GValue[0];
      }
      else {
        DebugService.WriteInfo("else (getPricesByEntryCode.GValue.length > 1)");
        //TODO error
        return false;
      }
    }
    if ((pureProductViewModel as any).Price === 0.00) {
      DebugService.WriteInfo("if (pureProductViewModel.Price === 0.00)");
      //TODO display error dialog
      return false;
    }

    // let checkForbiddenTax = this.productService.tempCheckForbiddenTaxgroup();
    let checkForbiddenTax = await this.productService.checkForbiddenTaxgroup(barcode);
    DebugService.WriteInfo(`checkForbiddenTax = ${JSON.stringify(checkForbiddenTax, null, 4)}`);
    if (!checkForbiddenTax.GValue) {
      DebugService.WriteInfo("if (!checkForbiddenTax.GValue)");
      //TODO display error dialog
      return false;
    }

    let IsAdditionalWeight = this.productService.tempIsAdditionalWeight();
    DebugService.WriteInfo(`IsAdditionalWeight = ${JSON.stringify(IsAdditionalWeight, null, 4)}`);
    if (IsAdditionalWeight.GValue) {
      DebugService.WriteInfo(`if (IsAdditionalWeight.GValue)`);
      //TODO add amount as argument
      amount = this.getScale(1);
    }

    if (amount === 0.0) {
      DebugService.WriteInfo("if (amount === 0.0)");
      amount = 1.0
    }

    if ((pureProductViewModel as any).Measure === 0) {
      DebugService.WriteInfo("if ((pureProductViewModel as any).Measure === 0)");
      if (amount > 9999) {
        amount = 9999;
      }
      else {
        if (amount < 1) {
          // TODO display dialog
          confirm("Количество штучного товара не может быть меньше 1!\nТовар: " + barcode);
          return false;
        }
        amount = parseInt(amount);
      }
    }
    else {
      if (amount > 9999.999) {
        amount = 9999.999;
      }
    }

    // let checkForbiddenBar = this.productService.tempCheckForbiddenBar((pureProductViewModel as any).Bar);
    let checkForbiddenBar = await this.productService.checkForbiddenBar(barcode);

    if (checkForbiddenBar.GValue === false) {
      // TODO dispay dialog
      confirm(checkForbiddenBar.GMessage);
      return false;
    }
    //console.log(pureProductViewModel);
    var processAppendProduct = await this.productService.isAddProductByEntry (barcode, (pureProductViewModel as any).Price, amount);

    // TODO display message
    result = processAppendProduct.GValue as boolean;

    if (!result){
      confirm(processAppendProduct.GMessage);
    }
    return result;
  }

  async getScale(amount: number): Promise<number> {
    let scale = await this.productService.GetScale(amount);
    if (scale.GValue == null) {
      //TODO display error scale.GMessage and  display dialog ask "repeat"?
      if (confirm('Повторить?')) {
        this.getScale(amount);
      }
    }
    else if ((scale.GValue as any).amount !== null && !isUndefined((scale.GValue as any).amount)) {
      return (scale.GValue as any).amount;
    }
    else {
      //TODO display dialog for input amount
      let inputAmount = prompt("Введите количество");
      return parseFloat(inputAmount);
    }
  }
}
