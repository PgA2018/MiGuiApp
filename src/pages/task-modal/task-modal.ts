import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})
export class TaskModalPage {

  titulo;
  fecha;
  descripcion;
  tareas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('misTareas').then((val) => {
        console.log(this.storage.length());
        if(val !== null){
          this.tareas = val;
        }
      });
    });
  }

  ionViewDidLoad() {
  }

  formulario(){
    this.storage.ready().then(() => {
      this.storage.remove('misTareas');
      this.tareas.push({
        titulo: this.titulo,
        fecha: this.fecha,
        descripcion: this.descripcion
      }); 
      this.storage.set('misTareas', this.tareas);
      console.log(this.storage.length());
    });
    this.navCtrl.pop();
  }
}
