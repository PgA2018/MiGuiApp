import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

  constructor(public http: HttpClient) {}

  apiUrl = apiUrl;

  /**
   * esto es para algo
   * @author Cristian Daza
   * @returns algo
   */

  getHotelTop() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugartophotel').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getRestaurantTop() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugartoprestaurante').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getTuristPlaceTop() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugartoplugar').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getPubTop() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugartopbar').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }  

  getMapaAll(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugarmapa').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
