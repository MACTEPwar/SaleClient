import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';

//import { ModalContainerComponent } from 'src/app/@_modules/modal/modal-container/modal-container.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  AlertHeader:string = "";
  AlertBody:string = "";

  constructor(public context:ModalContext<any>) {
  }

  ngOnInit() {
    this.AlertHeader = this.context.data.header;
    this.AlertBody = this.context.data.body; 
  }

}
