import { Component, OnInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  AlertHeader:string = "";
  AlertBody:string = "";

  constructor(public context:ModalContext<any>) { }

  ngOnInit() {
    this.AlertHeader = this.context.data.header;
    this.AlertBody = this.context.data.body; 
  }

}
