import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericKeyboardContainerComponent } from './numeric-keyboard-container/numeric-keyboard-container.component';
import { NumericKeyboardService } from './numeric-keyboard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumericKeyboardContainerComponent],
  providers: [NumericKeyboardService],
  exports:[NumericKeyboardContainerComponent]
})
export class NumericKeyboardModule { }