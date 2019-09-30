import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/@_models/Product';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { ReceiptService } from 'src/app/@_core/receipt/receipt.service';
import { ReceiptType } from 'src/app/@_enums/ReceiptType';
import { ReturnReceiptType } from 'src/app/@_enums/ReturnReceiptType';
import { ProductService } from 'src/app/@_core/product/product.service';
import { UserService } from 'src/app/@_core/user/user.service';
import { DefaultResult } from 'src/app/@_models/DefaultResult';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { LoginComponent } from '../modal-windows/login/login.component';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';
import { AlertModalComponent } from '../modal-windows/alert-modal/alert-modal.component';

declare var $: any;


@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements OnInit, AfterViewInit {

  @ViewChild('thead', { static: true }) thead_DataTable: ElementRef;
  @ViewChild('tbody', { static: true }) tbody_DataTable: ElementRef;

  Products: Array<Product>;

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    private mScrollbarService: MalihuScrollbarService,
    private receiptService: ReceiptService,
    private productService: ProductService,
    private userService: UserService,
    private modalService: ModalService,
    private authorizeService: AuthorizeService
  ) { }

  async ngOnInit() {
    await this.receiptService.refreshProductList();
    this.Products = this.receiptService.Receipt.Products;
  }
  ngAfterViewInit() {

    this.mScrollbarService.initScrollbar($(".dataTables_scrollBody"), { axis: 'y', theme: 'dark' });


    // настраиваю скроллбар
    $(".dataTables_scrollBody .mCSB_dragger_bar").css("width", "100%").addClass("bg-standart");
    $(".dataTables_scrollBody .mCSB_inside > .mCSB_container").css("margin-right", "40px");
    $(".dataTables_scrollBody .mCSB_scrollTools").css("width", "36px");
    //end
  }

  //TODO доделать возвраты
  async ProcessAddAmount(positions) {
    await this.receiptService.refreshProductList();

    let receipt = this.receiptService.Receipt.Products;
    //console.log(this.receiptService.Receipt.Type);
    if (this.receiptService.Receipt.Type === ReceiptType.Fiscal || (this.receiptService.Receipt.Type === ReceiptType.Return && this.receiptService.Receipt.ReturnReceiptType === ReturnReceiptType.RETURN_POSITION) || (this.receiptService.Receipt.Type === ReceiptType.Return && this.receiptService.Receipt.ReturnReceiptType === ReturnReceiptType.RETURN_POSITION_SERVER) || (this.receiptService.Receipt.Type === ReceiptType.Return && this.receiptService.Receipt.ReturnReceiptType === ReturnReceiptType.RETURN_RANDOM_RECEIPT)) {
      //console.log("YEEEEEP");
      let str_val = this.productService.getAmountString(receipt[positions - 1]);
      let isCanAddAmount: DefaultResult = await this.userService.isCanAddAmount();
      //console.log(isCanAddAmount);
      if (isCanAddAmount.Successed) {
        let Val = prompt("Укажите количество");
        // if (this.receiptService.Receipt.Type === ReceiptType.Return && this.receiptService.Receipt.ReturnReceiptType !== ReturnReceiptType.RETURN_RANDOM_RECEIPT){
        // }
        this.productService.changeProductAmount(positions - 1, parseFloat(Val));
        this.receiptService.refreshProductList();
      }
      else {
        //TODO залогиниться Login2

        // await this.modalService.open(AlertModalComponent, { header: "Ануляция", body: isCanAnulate.Message });
        let IsLogin2 = await this.modalService.open(LoginComponent, { loginType: 2 });
        if (IsLogin2) {
          let isCanAddAmountSecond: DefaultResult = await this.userService.isCanAddAmountSecond();
          if (isCanAddAmountSecond.Successed) {
            let Val = prompt("Укажите количество");
            this.productService.changeProductAmount(positions - 1, parseFloat(Val));
            this.receiptService.refreshProductList();
          }
          else {
            this.modalService.open(AlertModalComponent, { header: "Увеличение количества товара", body: isCanAddAmountSecond.Message });
          }

          await this.authorizeService.logout2();
        }
      }
    }
  }

}
