import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

@Injectable()
export class HomeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HomeServiceProvider Provider');
  }
  apiUrl = apiUrl;

  /**
   * Esta funcion llama un lugar de la api
   * @params
   */
  getService(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'serviciobusqueda/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
