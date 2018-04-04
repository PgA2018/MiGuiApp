import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ConfigurationAboutPage } from '../configuration-about/configuration-about';
import { SigninPage } from '../signin/signin';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public app: App) {
  }

  goToAbout(){
    this.navCtrl.push(ConfigurationAboutPage);
  }

  signOut() {
    this.authService.signOut();
    //this.navCtrl.setRoot(SigninPage);
    //this.events.publish('user:logout');
    this.app.getRootNav().setRoot(SigninPage);
  }
}
