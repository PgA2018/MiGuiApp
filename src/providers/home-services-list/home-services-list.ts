import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

@Injectable()
export class HomeServicesListProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HomeServicesListProvider Provider');
  }

  apiUrl = apiUrl;

  /**
   * Esta funcion llama la lista de hoteles del api
   * @params
   */
  getServiceList(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'serviciolista/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
