import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { AlertModalComponent } from 'src/app/@_components/modal-windows/alert-modal/alert-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  async add() {
    console.log(await this.modalService.open(AlertModalComponent));
  }
}
