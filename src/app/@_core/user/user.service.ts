import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/@_shared/api/api.service';

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
}
