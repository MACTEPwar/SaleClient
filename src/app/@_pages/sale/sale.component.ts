import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { MainMenuComponent } from 'src/app/@_components/modal-windows/main-menu/main-menu.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  async showMenu() {
    await this.modalService.open(MainMenuComponent);
  }

}
