import { Component, OnInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';

enum MenuItem{
  Null = "Меню",
  Copy = "Копии",
  Money = "Деньги",
  Returns = "Возвраты",
  Reports = "Отчеты",
  Service = "Сервис",
  System = "Система"
}

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})


export class MainMenuComponent implements OnInit {

  MenuItem = MenuItem;
  selectedItem:MenuItem;

  constructor(public context:ModalContext<any>) { }

  ngOnInit() {
    this.selectedItem = MenuItem.Null;
    //console.log(MenuItem.Null);
  }

  setSelectedItem(item:MenuItem){
    this.selectedItem = item;
  }

}
