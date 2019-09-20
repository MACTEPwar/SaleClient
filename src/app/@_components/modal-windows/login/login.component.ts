import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';
import { NumericKeyboardService } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.service';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('login',{static:false}) login:ElementRef;
  @ViewChild('password',{static:false}) password:ElementRef;

  private currentInput:HTMLInputElement;

  responseInfo = "";

  constructor(
    public context:ModalContext<any>,
    private numericKeyboardService:NumericKeyboardService,
    private authorizeService:AuthorizeService,
    private router:Router
    ) 
    { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    let domElement = this.login.nativeElement as HTMLInputElement;
    this.setViewContainerRef(domElement);
  }

  setViewContainerRef(element:HTMLInputElement){
    this.currentInput = element;
    if (this.currentInput.getAttribute("id")==="password") {
      this.currentInput.value = "";
    }
    this.numericKeyboardService.registerViewContainer(element);
  }

  onSelected(value:boolean){
    if(value){
      if (this.currentInput.getAttribute("id")==="login"){
        let domElement = this.password.nativeElement as HTMLInputElement;
        this.setViewContainerRef(domElement);
      }
      else{
        this.authorizeService.login(this.login.nativeElement.value,this.password.nativeElement.value).subscribe( r => {
          if (!r.GValue){
            this.responseInfo =  r.GMessage;
          }
          else{
            this.router.navigate(["/sale"]);
          }
        });
      }
    }
  }
}
