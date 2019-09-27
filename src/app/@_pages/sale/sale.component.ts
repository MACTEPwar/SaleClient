import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { MainMenuComponent } from 'src/app/@_components/modal-windows/main-menu/main-menu.component';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@_core/user/user.service';
import { SearchProductComponent } from 'src/app/@_components/modal-windows/search-product/search-product.component';
import { ReceiptService } from 'src/app/@_core/receipt/receipt.service';
import { AlertModalComponent } from 'src/app/@_components/modal-windows/alert-modal/alert-modal.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private authorizeService:AuthorizeService,
    private router:Router,
    private userService:UserService,
    private receiptService:ReceiptService
    ) { 
  }

  async ngOnInit() {
    if (!await this.authorizeService.IsAuthorized()){
      this.router.navigate(['/login'])
    }
    
  }

  //TODO: доделать, когда юра сделает
  async showMenu() {
    this.userService.getMenu();
    await this.modalService.open(MainMenuComponent);
  }

  async logout(){
    await this.authorizeService.logout();
    this.router.navigate(["/login"]);
  }

  async ShowBarcodeProduct(){
    await this.modalService.open(SearchProductComponent);
  }

  async doAnulReceipt(){
    let isCanAnulate = await this.receiptService.isCanAnulate();
    if (isCanAnulate.Successed){
      let doAnulReceipt = await this.receiptService.doAnulReceipt();
      if (doAnulReceipt.Successed){
        await this.modalService.open(AlertModalComponent,{header:"Ануляция",body:"Чек анулирован"});
        this.receiptService.refreshProductList();
      }
    }
    else if (!isCanAnulate.Successed && isCanAnulate.Value === "canceled_by_user"){
      await this.modalService.open(AlertModalComponent,{header:"Ануляция",body:"Ануляция отменена пользователем"});
    }
    else if (!isCanAnulate.Successed && isCanAnulate.Value === "receipt_empty"){
      await this.modalService.open(AlertModalComponent,{header:"Ануляция",body:"Нельзя анулировать пустой чек"});
    }
    else {
      //TODO show dialog login2
      await this.modalService.open(AlertModalComponent,{header:"Ануляция",body:isCanAnulate.Message});
    }
    
  }

}
