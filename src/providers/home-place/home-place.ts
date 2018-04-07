import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

@Injectable()
export class HomePlaceProvider {

  constructor(public http: HttpClient) {}
  apiUrl = apiUrl;

  /**
   * Esta funcion llama un lugar de la api
   * @params
   */
  getPlace(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'lugarbusqueda/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  obtenerCalificacion(id_lugar, id_usuario) {
    return new Promise(resolve => {
      this.http.get(apiUrl+'calificacion/'+id_lugar+'/'+id_usuario).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  calificarLugar(data) {
    this.http.post(apiUrl+'calificacion', data)
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }

  actualizarCalificacionLugar(id_lugar, id_usuario, data) {
    this.http.put(apiUrl+'calificacion/'+id_lugar+'/'+id_usuario, data)
    .subscribe(
      val => {
          console.log("PUT call successful value returned in body", val);
      },
      response => {
          console.log("PUT call in error", response);
      },
      () => {
          console.log("The PUT observable is now completed.");
      });
  }

  eliminarComentario(id, id_usuario){
    this.http.delete(apiUrl+'comentariolugarusuario/'+id+'/'+id_usuario)
    .subscribe(
      val => {
          console.log("DELETE call successful value returned in body", val);
      },
      response => {
          console.log("DELETE call in error", response);
      },
      () => {
          console.log("The DELETE observable is now completed.");
      });
  }

}
