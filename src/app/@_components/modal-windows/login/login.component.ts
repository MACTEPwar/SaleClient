import { Component, OnInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';
import { NumericKeyboardService } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public context:ModalContext<any>,private numericKeyboardService:NumericKeyboardService) { }

  ngOnInit() {
  }

  setViewContainerRef(element:HTMLInputElement){
    this.numericKeyboardService.registerViewContainer(element);
  }
}
