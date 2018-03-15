import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeServicePage } from './home-service';

@NgModule({
  declarations: [
    HomeServicePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeServicePage),
  ],
})
export class HomeServicePageModule {}
