import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ɵConsole } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';
import { NumericKeyboardService } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.service';
import { ProductService } from 'src/app/@_core/product/product.service';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { DebugService } from 'src/app/@_core/logs/debug.service';
import { isUndefined } from 'util';
import { Product } from 'src/app/@_models/Product';
import { ReceiptService } from 'src/app/@_core/receipt/receipt.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, AfterViewInit {

  errorMessage = "";
  //product:Product = null;

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(
    public context: ModalContext<any>,
    private numericKeyboardService: NumericKeyboardService,
    private productService: ProductService,
    private api: ApiService,
    private receiptService:ReceiptService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let input = this.input.nativeElement as HTMLInputElement;
    this.numericKeyboardService.registerViewContainer(input);
  }

  async onSelected(value: boolean) {
    //await this.test(this.input.nativeElement.value);
    //console.log(await this.ProcessEntryCode(this.input.nativeElement.value));
    if (value) {
      let code: string = this.input.nativeElement.value;

      if (code.indexOf("-") === -1){
        await this.ProcessEntryCode(code);
        this.context.resolve();
      }
      else if(code.indexOf("-") === 0){
        
      }
      else{
        confirm("Неверный формат строки");
      }
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
    let stepN1 = await this.productService.firstStep(code);

    amount = stepN1.amount;
    barcode = stepN1.barcode;

    var pureProductsViewModel = stepN1.ppDTO.GValue;

    if (pureProductsViewModel === null) {
      DebugService.WriteInfo("if (stepN1.ppDTO === null)")
      let getPricesByEntryCode = await this.productService.getListPureProductByEntryCode(barcode);

      if ((getPricesByEntryCode.GValue as any).length > 1) {
        DebugService.WriteInfo("if (getPricesByEntryCode.GValue.length > 1)");
        //TODO select one product
        pureProductsViewModel = getPricesByEntryCode.GValue[0];
      }
      else if ((getPricesByEntryCode.GValue as any).length === 1) {
        DebugService.WriteInfo("else if (getPricesByEntryCode.GValue.length === 1)");
        //TODO select first product
        pureProductsViewModel = getPricesByEntryCode.GValue[0];
      }
      else {
        DebugService.WriteInfo("else (getPricesByEntryCode.GValue.length > 1)");
        //TODO error
        return false;
      }
    }

    console.log(`pureProductsViewModel = ${JSON.stringify(pureProductsViewModel,null,4)}`);

    if (pureProductsViewModel.Price === 0.00) {
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

    // let IsAdditionalWeight = this.productService.tempIsAdditionalWeight();
    let IsAdditionalWeight = await this.productService.isAdditionalWeight(barcode,pureProductsViewModel.Price);
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

    if (pureProductsViewModel.Measure === 0) {
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
    var processAppendProduct = await this.productService.isAddProductByEntry(barcode, pureProductsViewModel.Price, amount);

    // TODO display message
    result = processAppendProduct.GValue as boolean;

    if (!result) {
      confirm(processAppendProduct.GMessage);
    }

    await this.receiptService.refreshProductList();

    return result;
  }

  async getScale(amount: number): Promise<number> {
    let scale = await this.productService.getScale(amount);
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
