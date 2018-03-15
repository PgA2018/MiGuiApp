import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { HomePlacePage } from '../pages/home-place/home-place';
import { HomePlacesListPage } from '../pages/home-places-list/home-places-list';
import { TaskPage } from '../pages/task/task';
import { TaskModalPage } from '../pages/task-modal/task-modal';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { ConfigurationAboutPage } from '../pages/configuration-about/configuration-about';
import { TabsPage } from '../pages/tabs/tabs';

import { ExpandableComponent } from '../components/expandable/expandable';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    HomePlacePage,
    HomePlacesListPage,
    TaskPage,
    TaskModalPage,
    ConfigurationPage,
    ConfigurationAboutPage,
    TabsPage,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    HomePlacePage,
    HomePlacesListPage,
    TaskPage,
    TaskModalPage,
    ConfigurationPage,
    ConfigurationAboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
