import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPopOverPage } from './maps-pop-over';

@NgModule({
  declarations: [
    MapsPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPopOverPage),
  ],
})
export class MapsPopOverPageModule {}
