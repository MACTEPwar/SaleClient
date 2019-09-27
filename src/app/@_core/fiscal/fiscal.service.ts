import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { DefaultResult } from 'src/app/@_models/DefaultResult';
import { DebugService } from '../logs/debug.service';

@Injectable({
  providedIn: 'root'
})
export class FiscalService {

  constructor(
    private apiService:ApiService
  ) { }

  async getWarningFromFiscal():Promise<DefaultResult>{
    let GetWarningFromFiscal = await this.apiService.SendComand('GetWarningFromFiscal').toPromise();
    DebugService.WriteInfo(`GetWarningFromFiscal = ${JSON.stringify(GetWarningFromFiscal,null,4)}`);
    //TODO сделать, когда Юра доделает
    //return new DefaultResult(GetWarningFromFiscal.GValue,GetWarningFromFiscal.GMessage);
    return GetWarningFromFiscal.GMessage !== null ? new DefaultResult(false,GetWarningFromFiscal.GMessage) : new DefaultResult(true,null); 
  }
}
