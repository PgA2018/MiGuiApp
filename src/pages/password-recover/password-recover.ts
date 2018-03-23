import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController  } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-password-recover',
  templateUrl: 'password-recover.html',
})
export class PasswordRecoverPage {

    email:string;
    

constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public authServiceProvider: AuthServiceProvider) {
}

    resetPass() {
        let loading = this.loadingCtrl.create({
            content: 'Enviando correo de recuperación. Por favor, espere...'
        });
        loading.present();

        this.authServiceProvider.resetPassword(this.email).then(result => {
            loading.dismiss();
            this.navCtrl.pop();
        }).catch(error => {
            loading.dismiss();

            console.log(error);
            this.alert('Error', 'Ha ocurrido un error inesperado. Por favor intente nuevamente.');
        });
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
