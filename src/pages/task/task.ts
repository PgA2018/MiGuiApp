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
    this.storage.ready().then(() => {
      this.storage.get('misTareas').then((val) => {
        console.log(this.storage.length());
        if(val !== null){
          this.tareas = val;
        }
      })
    });
  }

  ionViewDidLoad() {
    this.storage.ready().then(() => {
      this.storage.get('misTareas').then((val) => {
        console.log(this.storage.length());
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
    this.storage.remove('misTareas');
    this.tareas.splice(i,1);
    this.storage.ready().then(() => {
      this.storage.set('misTareas', this.tareas);
      console.log(this.storage.length());
    });
  }
}
