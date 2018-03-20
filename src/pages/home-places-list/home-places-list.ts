import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePlacePage } from '../home-place/home-place';
import { HomePlacesListProvider } from '../../providers/home-places-list/home-places-list';

@IonicPage()
@Component({
  selector: 'page-home-places-list',
  templateUrl: 'home-places-list.html',
})
export class HomePlacesListPage {

  list;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public homePlacesListProvider: HomePlacesListProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePlacesListPage');
    let id = this.navParams.get('id');
    if(id === 1){
      this.title = 'Hoteles';
      this.getHotelList();
    } else if(id === 2){
      this.title = 'Restaurantes';
      this.getRestaurantList();
    } else if(id === 3){
      this.title = 'Lugares Turísticos';
      this.getPlaceList();
    } else if(id === 4){
      this.title = 'Bares';
      this.getBarList();
    }
  }

  getHotelList(){
    this.homePlacesListProvider.getHotelList()
    .then(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  getRestaurantList(){
    this.homePlacesListProvider.getRestaurantList()
    .then(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  getPlaceList(){
    this.homePlacesListProvider.getPlaceList()
    .then(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  getBarList(){
    this.homePlacesListProvider.getBarList()
    .then(data => {
      this.list = data;
      console.log(this.list);
    });
  }

  goToPlace(){
    this.navCtrl.push(HomePlacePage);
  }

}
