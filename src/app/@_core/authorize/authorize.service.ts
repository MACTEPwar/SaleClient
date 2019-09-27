import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/@_shared/api/api.service';
import { map, subscribeOn } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Response } from 'src/app/@_models/Response';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  async IsAuthorized():Promise<boolean>{
    let res = await this.apiService.SendComand("IsLogin").toPromise();
    return res.GValue;
  }

  constructor(private apiService:ApiService,private userService:UserService) 
  {
  }

  login(login:string,password:string){
    let result;
    return this.apiService.SendComand("Login",[{"Login":login},{"Password":password}]).pipe(map(res => {
      result = res;
      return result;
    }));
    
  }

  //TODO: юрын метод ничего не возвращает
  logout(){
    return this.apiService.SendComand("Logout").toPromise();
  }

  async login2(login:string,password:string):Promise<Response>{
    return await this.apiService.SendComand("Login2",[{"Login":login},{"Password":password}]).toPromise()
  }

  async logout2():Promise<Response>{
    return await this.apiService.SendComand("Logout2").toPromise();
  }
}
