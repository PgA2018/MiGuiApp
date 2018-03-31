import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})
export class TaskModalPage {

  titulo;
  fecha;
  descripcion;
  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public database: AngularFireDatabase,public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController) {
      this.tasksRef = this.database.list('tasks');
      this.tasks = this.tasksRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  ionViewDidLoad() {
  }

  formulario(){
  let loading = this.loadingCtrl.create({
      content: 'Enviando tarea. Por favor, espere...'
  });
  loading.present();
  const user = this.authServiceProvider.getCurrentUser();
  if(user != null){
    loading.dismiss();
    this.tasksRef.push({
      usuario: user.uid,
      title: this.titulo,
      fecha: this.fecha,
      descripcion: this.descripcion
    });

  } else {
      loading.dismiss();
      this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    }
    this.navCtrl.pop();
  }
  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
}
}
