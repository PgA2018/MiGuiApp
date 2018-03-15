import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePlacesListPage } from '../home-places-list/home-places-list';
import { HomePlacePage } from '../home-place/home-place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToList(){
    this.navCtrl.push(HomePlacesListPage)
  }
  goToPlace(){
    this.navCtrl.push(HomePlacePage);
  }
}
