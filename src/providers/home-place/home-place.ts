import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HomePlaceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomePlaceProvider {

  constructor(public http: HttpClient) {}
  apiUrl = 'http://localhost:3000/drgapi/lugar/';

  /**
   * Esta funcion llama un lugar de la api
   * @params
   */
  getPlace(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
