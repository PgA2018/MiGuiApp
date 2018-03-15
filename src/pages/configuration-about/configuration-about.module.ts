import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurationAboutPage } from './configuration-about';

@NgModule({
  declarations: [
    ConfigurationAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurationAboutPage),
  ],
})
export class ConfigurationAboutPageModule {}
