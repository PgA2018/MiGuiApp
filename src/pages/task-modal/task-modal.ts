import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})
export class TaskModalPage {

  titulo;
  fecha: Date;
  descripcion;
  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;
  id;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private plt: Platform,
    public database: AngularFireDatabase,public authServiceProvider: AuthServiceProvider, public loadingCtrl: LoadingController, private localNotifications: LocalNotifications) {
      
      this.plt.ready().then((rdy) => {
        this.localNotifications.on('click', (notification, state) => {
          let json = JSON.parse(notification.data);
          let alert = this.alertCtrl.create({
            title: notification.title,
            subTitle: json.mydata
          });
          alert.present();
        });
      });
      
      
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
      this.saveReminder();
      this.tasksRef.push({
        usuario: user.uid,
        id: this.id,
        title: this.titulo,
        descripcion: this.descripcion,
        fecha: this.fecha
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

  saveReminder(): void {
    var mydate = moment(this.fecha).add(5,'hours').toDate();
    
    var cadena = mydate.toString();
    var numeros = cadena.split(" ");
    var hora = numeros[4].split(":");
    
    this.id = parseInt(numeros[2]+numeros[3]+hora[0]+hora[1]+hora[2]);

    this.localNotifications.schedule({
      id: this.id,
      title:this.titulo,
      text:this.descripcion,
      at: mydate,
      data:{ mydata: 'mas prueba'}
    });
  }

}
