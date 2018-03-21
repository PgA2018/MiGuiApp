import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FilterByNameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterByNameProvider {

  constructor(public http: HttpClient) {}

  filtro(list, busqueda){
    return list.filter((item) => {
      return item.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) > -1;
    }); 
  }

}
