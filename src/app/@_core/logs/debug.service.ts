import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class DebugService {

  constructor() { }

  public static WriteInfo(objects:Array<string|number|boolean|object>| number|string|boolean|object){
    console.log(objects);
  }
}
