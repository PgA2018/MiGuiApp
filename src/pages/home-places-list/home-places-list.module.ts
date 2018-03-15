import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePlacesListPage } from './home-places-list';

@NgModule({
  declarations: [
    HomePlacesListPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePlacesListPage),
  ],
})
export class HomePlacesListPageModule {}
