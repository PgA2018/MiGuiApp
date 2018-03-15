import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePlacePage } from './home-place';

@NgModule({
  declarations: [
    HomePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePlacePage),
  ],
})
export class HomePlacePageModule {}
