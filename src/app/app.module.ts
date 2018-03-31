import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';


// PAGINAS
import { MapsPage } from '../pages/maps/maps';
import { HomePage } from '../pages/home/home';
import { HomePlacePage } from '../pages/home-place/home-place';
import { HomePlacesListPage } from '../pages/home-places-list/home-places-list';
import { HomeServicePage } from '../pages/home-service/home-service';
import { HomeServicesListPage } from '../pages/home-services-list/home-services-list';
import { TaskPage } from '../pages/task/task';
import { TaskModalPage } from '../pages/task-modal/task-modal';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ConfigurationAboutPage } from '../pages/configuration-about/configuration-about';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
// COMPONENTES
import { ExpandableComponent } from '../components/expandable/expandable';
import { TruncatedTextComponent } from '../components/truncated-text/truncated-text';
// MODULOS
import { TruncateModule } from 'ng2-truncate';
import { Ionic2RatingModule } from 'ionic2-rating';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//PROVIDERS
import { HomeProvider } from '../providers/home/home';
import { HomePlacesListProvider } from '../providers/home-places-list/home-places-list';
import { FilterByNameProvider } from '../providers/filter-by-name/filter-by-name';
import { HomePlaceProvider } from '../providers/home-place/home-place';
import { HomeServicesListProvider } from '../providers/home-services-list/home-services-list';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PasswordRecoverPage } from '../pages/password-recover/password-recover';
import { CommentsProvider } from '../providers/comments/comments';
import { OneSignal } from '@ionic-native/onesignal';

export const firebaseConfig = {
  apiKey: "AIzaSyDk3BfriX8wpM2jip4_ejvXJHiRHkBaRec",
  authDomain: "turistapp-95698.firebaseapp.com",
  databaseURL: "https://turistapp-95698.firebaseio.com",
  projectId: "turistapp-95698",
  storageBucket: "turistapp-95698.appspot.com",
  messagingSenderId: "170098729848"
};

@NgModule({
  declarations: [
    MyApp,
    MapsPage,
    HomePage,
    HomePlacePage,
    HomePlacesListPage,
    HomeServicePage,
    HomeServicesListPage,
    TaskPage,
    TaskModalPage,
    ConfigurationPage,
    ConfigurationAboutPage,
    SigninPage,
    SignupPage,
    PasswordRecoverPage,
    TabsPage,
    ExpandableComponent,
    TruncatedTextComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    Ionic2RatingModule,
    HttpClientModule,
    TruncateModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapsPage,
    HomePage,
    HomePlacePage,
    HomePlacesListPage,
    HomeServicePage,
    HomeServicesListPage,
    SigninPage,
    SignupPage,
    PasswordRecoverPage,
    TaskPage,
    TaskModalPage,
    ConfigurationPage,
    ConfigurationAboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeProvider,
    HomePlacesListProvider,
    FilterByNameProvider,
    HomePlaceProvider,
    HomeServicesListProvider,
    HomeServiceProvider,
    AuthServiceProvider,
    GoogleMaps,
    CommentsProvider,
    OneSignal,
    Geolocation
  ]
})
export class AppModule {}
