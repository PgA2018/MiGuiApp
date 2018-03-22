import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeServiceProvider } from '../../providers/home-service/home-service';

@IonicPage()
@Component({
  selector: 'page-home-service',
  templateUrl: 'home-service.html',
})
export class HomeServicePage {

  service;

  constructor(public navCtrl: NavController, public navParams: NavParams, public homeServiceProvider: HomeServiceProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeServicePage');
    this.getService(this.navParams.get('id'));
  }

  getService(id){
    this.homeServiceProvider.getService(id)
    .then(data => {
      this.service = data;
      console.log(this.service);
    });
  }

}
