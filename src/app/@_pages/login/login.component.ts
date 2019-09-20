import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/@_modules/modal/modal.service';
import { LoginComponent as LoginModal } from 'src/app/@_components/modal-windows/login/login.component';
import { Router } from '@angular/router';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private modalService: ModalService,private router:Router,private AuthService:AuthorizeService) { 
    
  }

  async ngOnInit() {
    if (await this.AuthService.IsAuthorized()){
      this.router.navigate(["/sale"]);
    }
  }

  async showLoginModal() {
    await this.modalService.open(LoginModal);
  }
}
