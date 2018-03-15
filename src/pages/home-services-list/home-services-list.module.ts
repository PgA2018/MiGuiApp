import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeServicesListPage } from './home-services-list';

@NgModule({
  declarations: [
    HomeServicesListPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeServicesListPage),
  ],
})
export class HomeServicesListPageModule {}
