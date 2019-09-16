import { Component, OnInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';

//import { ModalContainerComponent } from 'src/app/@_modules/modal/modal-container/modal-container.component';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(public context:ModalContext<any>) { }

  ngOnInit() {
  }

}
