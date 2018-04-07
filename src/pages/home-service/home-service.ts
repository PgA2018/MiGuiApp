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
  id_usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public homeServiceProvider: HomeServiceProvider,public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,public authServiceProvider: AuthServiceProvider, public commentProvider: CommentsProvider) {
        const user = this.authServiceProvider.getCurrentUser();
            if(user != null){
                this.id_usuario = user.uid;
            }
    }

    ionViewWillEnter(){
     console.log("hola will ENter");
     
    }
    ionViewCanEnter(){
     console.log("hola can enter");
     
    }
    ionViewDidEnter(){
     console.log("hola did enter");
     
    }

  ionViewDidLoad() {
    this.items = [{expanded: false}];
    this.getService(this.navParams.get('id'));
    this.getServicePuntosNegativos(this.navParams.get('id'));
    this.getServicePuntosPositivos(this.navParams.get('id'));
    this.obtenerCalificacion(this.navParams.get('id'));
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getService(this.navParams.get('id'));
    this.getServicePuntosNegativos(this.navParams.get('id'));
    this.getServicePuntosPositivos(this.navParams.get('id'));
    this.obtenerCalificacion(this.navParams.get('id'));
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
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
    });
  }

  getServicePuntosPositivos(id){
    this.homeServiceProvider.getServicePuntosPositivos(id)
    .then(data => {
      this.puntosPositivos = data;
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
        this.obtenerCalificacion(this.navParams.get('id'));
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
                //if(puntoNuevo === true) this.puntosPositivos.CalificacionServicios[0].positivos++;
                //else this.puntosNegativos.CalificacionServicios[0].negativos++;
            } else {
                this.homeServiceProvider.actualizarCalificacionLugar(id_servicio, user.uid, {valor: puntoNuevo});
                /*if(this.punto === true && puntoNuevo===false){
                    this.puntosPositivos.CalificacionServicios[0].positivos--;
                    this.puntosNegativos.CalificacionServicios[0].negativos++;
                    this.punto = false;
                }
                else if(this.punto === false && puntoNuevo===true){
                    this.puntosPositivos.CalificacionServicios[0].positivos++;
                    this.puntosNegativos.CalificacionServicios[0].negativos--;
                    this.punto = true;
                }
                console.log(this.punto + ' - ' + puntoNuevo);*/
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

    eliminarComentario(id, id_usuario){
        this.homeServiceProvider.eliminarComentario(id, id_usuario);
    }
}
