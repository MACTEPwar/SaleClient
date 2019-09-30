import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { DefaultResult } from 'src/app/@_models/DefaultResult';
import { DebugService } from '../logs/debug.service';
import { Response } from 'src/app/@_models/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  //TODO: переделать, когда Юра доделает
  async getFirstKassir() {
    return await this.apiService.SendComand("GetFirstKassir").toPromise();
  }

  async getCurrentPerms():Promise<Array<string>> {
    let currentKassir = await this.getFirstKassir();
    return currentKassir.Perm;
  }

  async getCurrentName():Promise<string>{
    let currentKassir = await this.getFirstKassir();
    return currentKassir.Name;
  }

  //TODO: переделать, когда Юра доделает
  async getMenu(){
    // let perms = await this.getCurrentPerms();
    // return this.apiService.SendComand("GenerateManu",[{"Perms":perms}]).toPromise();

    return null;
  }

  async isCanAddAmount():Promise<DefaultResult>{
    let isCanAddAmount:Response = await this.apiService.SendComand('IsCanAddAmount').toPromise();
    DebugService.WriteInfo(`isCanAddAmount = ${JSON.stringify(isCanAddAmount,null,4)}`);
    if (isCanAddAmount.GValue){
      return new DefaultResult(true,null);
    }
    else {
      return new DefaultResult(false,isCanAddAmount.GMessage);
    }
  }

  async isCanAddAmountSecond():Promise<DefaultResult>{
    let isCanAddAmountSecond:Response = await this.apiService.SendComand('IsCanAddAmountSecond').toPromise();
    DebugService.WriteInfo(`isCanAddAmountSecond = ${JSON.stringify(isCanAddAmountSecond,null,4)}`);
    if (isCanAddAmountSecond.GValue){
      return new DefaultResult(true,null);
    }
    else {
      return new DefaultResult(false,isCanAddAmountSecond.GMessage);
    }
  }
}
