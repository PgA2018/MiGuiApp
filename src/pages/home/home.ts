import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePlacesListPage } from '../home-places-list/home-places-list';
import { HomePlacePage } from '../home-place/home-place';
import { HomeProvider } from '../../providers/home/home';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hotels;
  restaurants;
  turistplaces;
  pubs;

  constructor(public navCtrl: NavController, public homeProvider: HomeProvider) {}

  ionViewDidLoad(){
    this.getHotel();
    this.getRestaurant();
    this.getTuristPlace();
    this.getPub();
  }

  getHotel(){
    this.homeProvider.getHotelTop()
    .then(data => {
      this.hotels = data;
    });
  }

  getRestaurant(){
    this.homeProvider.getRestaurantTop()
    .then(data => {
      this.restaurants = data;
      //console.log(this.restaurants[0].FotoLugars[0]);
      
    });
  }

  getTuristPlace(){
    this.homeProvider.getTuristPlaceTop()
    .then(data => {
      this.turistplaces = data;
    });
  }

  getPub(){
    this.homeProvider.getPubTop()
    .then(data => {
      this.pubs = data;
    });
  }

  goToList(id){
    this.navCtrl.push(HomePlacesListPage,{
      id: id
    });
  }
  
  goToPlace(id){
    this.navCtrl.push(HomePlacePage,{
      id: id
    });
  }
}
