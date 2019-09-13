import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('../../assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  Get(Key:string){
    let obj = this.appConfig[Key];
    if (!isUndefined(obj)){
      return obj;
    }
    else{
      throw Error('Ключ '+ Key +' не найден в конфиге');
    }
  }
}
