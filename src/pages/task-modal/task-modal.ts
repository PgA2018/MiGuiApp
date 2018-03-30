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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskModalPage');
  }

  formulario(){
    this.storage.ready().then(() => {
      this.storage.get('misTareas').then((val) => {
        this.tareas = val;
      });
    });
    this.storage.ready().then(() =>{
      this.tareas[this.tareas.length] = {
        titulo: this.titulo,
        fecha: this.fecha,
        descripcion: this.descripcion
      }
      console.log(this.tareas);
      
      this.storage.set('misTareas', this.tareas);
    });
    this.navCtrl.pop();
  }
}
