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
  itemExpandHeight: number = 120;
  items: any = [];
  truncating = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public homeServiceProvider: HomeServiceProvider) {}

  ionViewDidLoad() {
    this.items = [{expanded: false}];
    this.getService(this.navParams.get('id'));
  }

  getService(id){
    this.homeServiceProvider.getService(id)
    .then(data => {
      this.service = data;
    });
  }
  expandItem(item){
    this.items.map((listItem) => {
        if(item == listItem){
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }
        return listItem;
    });
    this.truncating = !this.truncating;
}
}
