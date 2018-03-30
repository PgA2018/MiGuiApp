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
      this.storage.get('misTareas').then((val) => {
        this.tareas = val;
      })
    });
  }
  
  taskModal() {
    let modal = this.modalCtrl.create(TaskModalPage);
    modal.present();
  }
}
