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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getHotel();
    this.getRestaurant();
    this.getTuristPlace();
    this.getPub();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  getHotel(){
    this.homeProvider.getHotelTop()
    .then(data => {
      this.hotels = data;
      var nuevosHoteles = [];
      for (let index = 0; index < this.hotels.length; index++) {
        if(this.hotels[index].Calificacions[0]){
          nuevosHoteles.push(this.hotels[index]);
        }
      }
      if(nuevosHoteles.length > 5){
        nuevosHoteles.splice(5, nuevosHoteles.length - 5);
      }
      this.hotels = nuevosHoteles;
    });
  }

  getRestaurant(){
    this.homeProvider.getRestaurantTop()
    .then(data => {
      this.restaurants = data;
      var nuevosRestaurantes = [];
      for (let index = 0; index < this.restaurants.length; index++) {
        if(this.restaurants[index].Calificacions[0]){
          nuevosRestaurantes.push(this.restaurants[index]);
        }
      }
      if(nuevosRestaurantes.length > 5){
        nuevosRestaurantes.splice(5, nuevosRestaurantes.length - 5);
      }
      this.restaurants = nuevosRestaurantes;
    });
  }

  getTuristPlace(){
    this.homeProvider.getTuristPlaceTop()
    .then(data => {
      this.turistplaces = data;
      var nuevosLugares = [];
      for (let index = 0; index < this.turistplaces.length; index++) {
        if(this.turistplaces[index].Calificacions[0]){
          nuevosLugares.push(this.turistplaces[index]);
        }
      }
      if(nuevosLugares.length > 5){
        nuevosLugares.splice(5, nuevosLugares.length - 5);
      }
      this.turistplaces = nuevosLugares;
    });
  }

  getPub(){
    this.homeProvider.getPubTop()
    .then(data => {
      this.pubs = data;
      var nuevosPubs = [];
      for (let index = 0; index < this.pubs.length; index++) {
        if(this.pubs[index].Calificacions[0]){
          nuevosPubs.push(this.pubs[index]);
        }
      }
      if(nuevosPubs.length > 5){
        nuevosPubs.splice(5, nuevosPubs.length - 5);
      }
      this.pubs = nuevosPubs;
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
