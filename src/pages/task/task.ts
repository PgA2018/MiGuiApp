import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { TaskModalPage } from '../task-modal/task-modal';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  usuario;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController,
    public database: AngularFireDatabase, public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController) {
      const user = this.authServiceProvider.getCurrentUser();
      if(user != null){
        this.usuario = user.uid;
      }
  }

  ionViewDidLoad() {
    
    this.tasksRef = this.database.list('tasks', ref => ref.orderByChild('usuario').equalTo(this.usuario));
    this.tasks = this.tasksRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => (
        { 
          key: c.payload.key, 
          ...c.payload.val() 
        }
      ));
    });
  }
  
  taskModal() {
    let modal = this.modalCtrl.create(TaskModalPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.ionViewDidLoad();
    });
  }

  removeTask( task ){
    console.log( task );
    this.tasksRef.remove( task.key );
  }
}
