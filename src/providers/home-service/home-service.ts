import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

@Injectable()
export class HomeServiceProvider {

  constructor(public http: HttpClient) {
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
  getServicePuntosNegativos(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'serviciobusquedapuntosnegativos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getServicePuntosPositivos(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'serviciobusquedapuntospositivos/'+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  obtenerCalificacion(id_usuario,id_servicio) {
    return new Promise(resolve => {
      this.http.get(apiUrl+'calificacionservicio/'+id_usuario+'/'+id_servicio).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  calificarLugar(data) {
    this.http.post(apiUrl+'calificacionservicio', data)
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

  actualizarCalificacionLugar(id_servicio, id_usuario, data) {
    this.http.put(apiUrl+'calificacionservicio/'+id_usuario+'/'+id_servicio, data)
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
    this.http.delete(apiUrl+'comentarioserviciousuario/'+id+'/'+id_usuario)
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
