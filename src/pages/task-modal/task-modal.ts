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
  tareas : Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.ready().then(() => {
      this.storage.get('misTareas').then((val) => {
        this.tareas = val;
      });
    });
  }

  ionViewDidLoad() {
  }

  formulario(){
    this.storage.ready().then(() => {
      this.tareas.push({
        titulo: this.titulo,
        fecha: this.fecha,
        descripcion: this.descripcion
      }); 
      this.storage.set('misTareas', this.tareas);
    });
    console.log(this.tareas);
    this.navCtrl.pop();
  }
}
