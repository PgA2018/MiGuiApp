import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authService: AuthServiceProvider, private oneSignal: OneSignal, private alertCtrl: AlertController) {
     var user = authService.angularFireAuth.auth.currentUser;
      if(user){
        this.rootPage = TabsPage;
      } else {
        this.rootPage = SigninPage;
      }
    
    if (!authService.authenticated) {
      this.rootPage = SigninPage;
    } else {
      this.rootPage = TabsPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.handlerNotifications();
      
    });
  }

  private handlerNotifications(){
    this.oneSignal.startInit('438e0273-94a0-493c-82c1-dbfba2c8e253', '170098729848');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
  }
}
