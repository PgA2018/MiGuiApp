import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { HomePlacePage } from '../pages/home-place/home-place';
import { HomePlacesListPage } from '../pages/home-places-list/home-places-list';
import { HomeServicePage } from '../pages/home-service/home-service';
import { HomeServicesListPage } from '../pages/home-services-list/home-services-list';
import { TaskPage } from '../pages/task/task';
import { TaskModalPage } from '../pages/task-modal/task-modal';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ConfigurationAboutPage } from '../pages/configuration-about/configuration-about';
import { TabsPage } from '../pages/tabs/tabs';

import { ExpandableComponent } from '../components/expandable/expandable';

import { Ionic2RatingModule } from 'ionic2-rating';

import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomeProvider } from '../providers/home/home';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    HomePlacePage,
    HomePlacesListPage,
    HomeServicePage,
    HomeServicesListPage,
    TaskPage,
    TaskModalPage,
    ConfigurationPage,
    ConfigurationAboutPage,
    TabsPage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    HomePlacePage,
    HomePlacesListPage,
    HomeServicePage,
    HomeServicesListPage,
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
    HomeProvider
  ]
})
export class AppModule {}
