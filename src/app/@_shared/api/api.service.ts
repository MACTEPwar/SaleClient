import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config/app-config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) { }

  SendComand(Command: string, Params: any = null) {
    if (Params === null) {
      return this.http.get(this.appConfigService.Get("apiBaseUrl") + "/" + Command);
    }
    else if (typeof Params === "number" || typeof Params === "boolean" || typeof Params === "string") {
      return this.http.post<any>(this.appConfigService.Get("apiBaseUrl") + "/" + Command, JSON.stringify({ Params }));
    }
    else if (Params instanceof Array) {
      let param = {};
      Params.forEach(function (item) {
        if (typeof item === "object") {
          param[Object.keys(item)[0]] = Object.values(item)[0];
        }
      });
      return this.http.post<any>(this.appConfigService.Get("apiBaseUrl") + "/" + Command, JSON.stringify(param));
    }
    else {
      console.log("Не верный формат данных.");
    }
  }

  SendTest(Command: string, Params: any = null) {
    console.log("host: " + this.appConfigService.Get("apiBaseUrl"));
    if (Params === null) {
      console.log("0 param - get");
      return this.http.get(this.appConfigService.Get("apiBaseUrl") + "/" + Command)
        .pipe(map(result => {
        }));
    }
    else if (typeof Params === "number" || typeof Params === "boolean" || typeof Params === "string") {
      console.log("1 param - post");
      return this.http.post<any>(this.appConfigService.Get("apiBaseUrl") + "/" + Command, JSON.stringify({ Params }))
        .pipe(map(result => {
        }));
    }
    else if (Params instanceof Array) {
      console.log("2+ param - post");
      let param = {};
      Params.forEach(function (item) {
        if (typeof item === "object") {
          param[Object.keys(item)[0]] = Object.values(item)[0];
        }
      });
      return this.http.post<any>(this.appConfigService.Get("apiBaseUrl") + "/" + Command, JSON.stringify(param))
        .pipe(map(result => {
        }));
    }
    else {
      console.log("failed");
    }
  }

  TestConnection() {
    console.log("start test");
    this.http.get(this.appConfigService.Get("apiBaseUrl") + "/Login")
      .pipe(map(result => {
        console.log('end test');
        console.log(result);
      }));
  }
}
