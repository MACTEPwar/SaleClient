import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NumericKeyboardService} from '../numeric-keyboard.service'

@Component({
  selector: 'app-numeric-keyboard-container',
  templateUrl: './numeric-keyboard-container.component.html',
  styleUrls: ['./numeric-keyboard-container.component.css']
})
export class NumericKeyboardContainerComponent implements OnInit {
  // height for this component
  @Input() height: number = 200;
  //heigh for this component in "px"
  heightStyle: string;
  //OK или крестик (true/false)
  @Output() onSelected = new EventEmitter<boolean>();
  //при вводе
  @Output() onInput = new EventEmitter<string>();

  constructor(private service:NumericKeyboardService) {
    this.heightStyle = this.height + "px";
  }

  ngOnInit() {
  }

  addNumber(value:string|number){
    this.service.setValue(value);
    this.onInput.emit(this.service.getCurrentValue());
  }

  breakNumber() {
    this.service.breakNumber();
    this.onInput.emit(this.service.getCurrentValue());
  }

  select(flag:boolean) {
    this.onSelected.emit(flag);
  }
}