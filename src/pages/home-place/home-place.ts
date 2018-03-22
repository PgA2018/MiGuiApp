import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeServicePage } from '../home-service/home-service';
import { HomeServicesListPage } from '../home-services-list/home-services-list';
import { HomePlaceProvider } from '../../providers/home-place/home-place';

@IonicPage()
@Component({
  selector: 'page-home-place',
  templateUrl: 'home-place.html',
})
export class HomePlacePage {

    place: object = null;
    itemExpandHeight: number = 120;
    items: any = [];
    rate: number = 3;
    truncating = true;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public homePlace: HomePlaceProvider) {}

    ionViewDidLoad() {
        this.items = [{expanded: false}];
        this.getPlace(this.navParams.get('id'));
    }

    getPlace(ide){
        this.homePlace.getPlace(ide)
        .then(data => {
            this.place = data;
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
    
    goToService(id){
        this.navCtrl.push(HomeServicePage,{
            id: id
        });
    }
    goToServicesList(id){
        this.navCtrl.push(HomeServicesListPage,{
            id: id
        });
    }   
}
