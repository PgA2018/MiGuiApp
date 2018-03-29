import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommentsProvider } from '../../providers/comments/comments';

@IonicPage()
@Component({
  selector: 'page-home-service',
  templateUrl: 'home-service.html',
})
export class HomeServicePage {

  service;
  itemExpandHeight: number = 120;
  items: any = [];
  truncating = true;
  informacionComentario;
  comentario;
  puntosNegativos;
  puntosPositivos;
  punto;
  calificado;

  constructor(public navCtrl: NavController, public navParams: NavParams, public homeServiceProvider: HomeServiceProvider,public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public authServiceProvider: AuthServiceProvider, public commentProvider: CommentsProvider) {}

  ionViewDidLoad() {
    this.items = [{expanded: false}];
    this.getService(this.navParams.get('id'));
    this.getServicePuntosNegativos(this.navParams.get('id'));
    this.getServicePuntosPositivos(this.navParams.get('id'));
    this.obtenerCalificacion(this.navParams.get('id'));
  }

  getService(id){
    this.homeServiceProvider.getService(id)
    .then(data => {
      this.service = data;
    });
  }

  getServicePuntosNegativos(id){
    this.homeServiceProvider.getServicePuntosNegativos(id)
    .then(data => {
      this.puntosNegativos = data;
      console.log('los negativos'+this.puntosNegativos);
    });
  }

  getServicePuntosPositivos(id){
    this.homeServiceProvider.getServicePuntosPositivos(id)
    .then(data => {
      this.puntosPositivos = data;
      console.log('los positivos'+this.puntosPositivos);
      
    });
  }

  expandItem(item){
    this.items.map((listItem) => {
        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }
        return listItem;
    });
    this.truncating = !this.truncating;
  }

  logForm(id_servicio) {
    let loading = this.loadingCtrl.create({
        content: 'Enviando comentario. Por favor, espere...'
    });
    loading.present();
    const user = this.authServiceProvider.getCurrentUser();
    if(user != null){
        loading.dismiss();
        this.informacionComentario = {
            correo_usuario: user.email,
            id_usuario: user.uid,
            id_servicio: id_servicio,
            descripcion: this.comentario
        }
        this.commentProvider.agregarComentarioServicio(this.informacionComentario);
        this.comentario = '';
    } else {
        loading.dismiss();
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    }
  }

  obtenerCalificacion(ide){
    const user = this.authServiceProvider.getCurrentUser();
    if(user != null){
        var id_usuario = user.uid;
    }
    this.homeServiceProvider.obtenerCalificacion(id_usuario, ide )
    .then(data => {
        this.calificado = data;
        if(this.calificado !== null){
          this.punto = this.calificado.valor;
        } 
    });
}

calificarLugar(id_servicio, puntoNuevo){
  console.log('EL PRIMER MENSAJE' + this.calificado);
  console.log('EL MENSAJE' + this.punto);
    let loading = this.loadingCtrl.create({
        content: 'Enviando calificacion. Por favor, espere...'
    });
    loading.present();
    const user = this.authServiceProvider.getCurrentUser();
    if(user != null){
        loading.dismiss();
        let informacionCalificacion = {
            id_servicio: id_servicio,
            id_usuario: user.uid,
            valor: puntoNuevo
        }
        if(this.punto === undefined){
            this.homeServiceProvider.calificarLugar(informacionCalificacion);
        } else {
            this.homeServiceProvider.actualizarCalificacionLugar(id_servicio, user.uid, {valor: puntoNuevo})
        }
        
    } else {
        loading.dismiss();
        this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
    }
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
