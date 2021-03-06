import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalContext } from 'src/app/@_modules/modal/modal-context';
import { NumericKeyboardService } from 'src/app/@_modules/numeric-keyboard/numeric-keyboard.service';
import { AuthorizeService } from 'src/app/@_core/authorize/authorize.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/@_models/Response';

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
  loginType:number;

  constructor(
    public context:ModalContext<any>,
    private numericKeyboardService:NumericKeyboardService,
    private authorizeService:AuthorizeService,
    private router:Router
    ) 
    { }

  ngOnInit() {
    this.loginType = this.context.data.loginType;
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

  async onSelected(value:boolean){
    if(value){
      if (this.currentInput.getAttribute("id")==="login"){
        let domElement = this.password.nativeElement as HTMLInputElement;
        this.setViewContainerRef(domElement);
      }
      else{
        if (this.loginType === 1){
          this.authorizeService.login(this.login.nativeElement.value,this.password.nativeElement.value).subscribe( r => {
            if (!r.GValue){
              this.responseInfo =  r.GMessage;
            }
            else{
              this.router.navigate(["/sale"]);
            }
          });
        }
        else if (this.loginType === 2){
          let log2:Response = await this.authorizeService.login2(this.login.nativeElement.value,this.password.nativeElement.value)
          if (!log2.GValue){
            this.responseInfo =  log2.GMessage;
            //this.context.resolve(false);
          }
          else{
            this.context.resolve(true);
          }
        }
        else {
          //TODO wtf
        }
        
      }
    }
  }
}
