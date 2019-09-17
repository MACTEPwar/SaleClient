import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { LoginComponent as LoginModal } from 'src/app/@_components/modal-windows/login/login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  async showLoginModal() {
    await this.modalService.open(LoginModal);
  }
}
