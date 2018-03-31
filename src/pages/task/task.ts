import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TaskModalPage } from '../task-modal/task-modal';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  tareas = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('tareas').then((val) => {
        if(val !== null){
          this.tareas = val;
        }
      })
    });
  }
  
  taskModal() {
    let modal = this.modalCtrl.create(TaskModalPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
  }
  
  eliminarTarea(i){
    this.tareas.splice(i,1);
    this.storage.ready().then(() => {
      this.storage.set('tareas', this.tareas);
    });
  }
}
