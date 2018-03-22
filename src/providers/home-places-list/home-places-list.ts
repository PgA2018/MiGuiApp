import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

@Injectable()
export class HomePlacesListProvider {

  constructor(public http: HttpClient) {}

  apiUrl = apiUrl;

  /**
   * Esta funcion llama la lista de hoteles del api
   * @params
   */
  getHotelList() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugarlistahotel').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getRestaurantList() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugarlistarestaurante').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getPlaceList() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugarlistaturistico').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getBarList() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugarlistabar').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
