import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomeServicePage } from '../home-service/home-service';
import { HomeServicesListPage } from '../home-services-list/home-services-list';
import { HomePlaceProvider } from '../../providers/home-place/home-place';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CommentsProvider } from '../../providers/comments/comments';

@IonicPage()
@Component({
  selector: 'page-home-place',
  templateUrl: 'home-place.html',
})
export class HomePlacePage {

    place: object = null;
    itemExpandHeight: number = 120;
    items: any = [];
    rate: number = 0;
    truncating = true;
    comentario = '';
    informacionComentario;
    cali;
    id_usuario;
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public homePlace: HomePlaceProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public commentProvider: CommentsProvider, 
        public authServiceProvider: AuthServiceProvider) {
            const user = this.authServiceProvider.getCurrentUser();
            if(user != null){
                this.id_usuario = user.uid;
            }
        }

    ionViewDidLoad() {
        this.getPlace(this.navParams.get('id'));
        this.obtenerCalificacion(this.navParams.get('id'));
        this.items = [{expanded: false}];
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.getPlace(this.navParams.get('id'));
        setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
        }, 1000);
    }

    getPlace(ide){
        this.homePlace.getPlace(ide)
        .then(data => {
            this.place = data;
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
    
    goToService(id){
        this.navCtrl.push(HomeServicePage,{
            id: id
        });
    }
    goToServicesList(id){
        this.navCtrl.push(HomeServicesListPage,{
            id: id
        });
    }

    logForm(id_lugar) {
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
                id_lugar: id_lugar,
                descripcion: this.comentario
            }
            this.commentProvider.agregarComentarioLugar(this.informacionComentario);
            this.comentario = '';
        } else {
            loading.dismiss();
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        }
        this.getPlace(this.navParams.get('id'));
    } 
    
    obtenerCalificacion(ide){
        const user = this.authServiceProvider.getCurrentUser();
        if(user != null){
            var id_usuario = user.uid;
        }
        this.homePlace.obtenerCalificacion(ide, id_usuario)
        .then(data => {
            this.cali = data;
            if(this.cali === null){
                this.rate = 0;
            } else {
                this.rate = this.cali.calificacion;
            }
        });
    }

    calificarLugar(id_lugar){
        let loading = this.loadingCtrl.create({
            content: 'Enviando calificacion. Por favor, espere...'
        });
        loading.present();
        const user = this.authServiceProvider.getCurrentUser();
        if(user != null){
            loading.dismiss();
            let informacionCalificacion = {
                id_lugar: id_lugar,
                id_usuario: user.uid,
                calificacion: this.rate
            }
            if(this.cali === null){
                this.homePlace.calificarLugar(informacionCalificacion);
            } else {
                this.homePlace.actualizarCalificacionLugar(id_lugar, user.uid, {calificacion: this.rate})
            }
            
            this.getPlace(this.navParams.get('id'));
        } else {
            loading.dismiss();
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        }
        this.getPlace(this.navParams.get('id'));
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
        this.homePlace.eliminarComentario(id, id_usuario);
    }
    
}
