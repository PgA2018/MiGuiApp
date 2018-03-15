import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePlacePage } from '../home-place/home-place';

@IonicPage()
@Component({
  selector: 'page-home-places-list',
  templateUrl: 'home-places-list.html',
})
export class HomePlacesListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePlacesListPage');
  }

  goToPlace(){
    this.navCtrl.push(HomePlacePage);
  }

}
