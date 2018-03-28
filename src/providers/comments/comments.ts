import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../conf';

@Injectable()
export class CommentsProvider {

  constructor(public http: HttpClient) {
  }

  agregarComentarioLugar(data) {
    this.http.post(apiUrl+'comentariolugar', data)
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }
  agregarComentarioServicio(data) {
    this.http.post(apiUrl+'comentarioservicio', data)
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
  }
}
