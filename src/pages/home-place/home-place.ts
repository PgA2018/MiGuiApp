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
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public homePlace: HomePlaceProvider,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public commentProvider: CommentsProvider, 
        public authServiceProvider: AuthServiceProvider) {}

    ionViewDidLoad() {
        this.items = [{expanded: false}];
        this.getPlace(this.navParams.get('id'));
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
