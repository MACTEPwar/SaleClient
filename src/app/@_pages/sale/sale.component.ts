import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { MainMenuComponent } from 'src/app/@_components/modal-windows/main-menu/main-menu.component';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@_core/user/user.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  constructor(private modalService: ModalService,private authorizeService:AuthorizeService,private router:Router,private userService:UserService) { 
  }

  async ngOnInit() {
    if (!await this.authorizeService.IsAuthorized()){
      this.router.navigate(['/login'])
    }
    
  }

  async showMenu() {
    //this.generatorMenu.generateMenu();
    this.userService.getMenu();
    await this.modalService.open(MainMenuComponent);
  }

  async logout(){
    await this.authorizeService.logout();
    this.router.navigate(["/login"]);
  }

}
