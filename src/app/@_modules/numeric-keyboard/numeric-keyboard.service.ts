import { Injectable,ViewContainerRef } from '@angular/core';

@Injectable()
export class NumericKeyboardService {

  private element: HTMLInputElement = null;
  
  constructor() { }

  public registerViewContainer(element: HTMLInputElement) {
    if (this.element !== null)
      this.element = null;
    this.element = element;
  }

  public setValue(value: string | number){
    if (this.element !== null)this.element.value += value;
  }

  public breakNumber() {
    if (this.element.value.length > 0) {
      this.element.value = this.element.value.substring(0, this.element.value.length - 1);
    }
  }

  public getCurrentValue():string{
    if (this.element !== null){
      return this.element.value;
    }
    else{
      return null
    }
  }

}