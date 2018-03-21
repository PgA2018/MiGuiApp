import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePlacePage } from '../home-place/home-place';
import { HomePlacesListProvider } from '../../providers/home-places-list/home-places-list';
import { FilterByNameProvider } from '../../providers/filter-by-name/filter-by-name';

@IonicPage()
@Component({
  selector: 'page-home-places-list',
  templateUrl: 'home-places-list.html',
})
export class HomePlacesListPage {

  list;
  listSearch;
  title: string;
  busqueda: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public homePlacesList: HomePlacesListProvider, public filerByName : FilterByNameProvider) {
  }

  ionViewDidLoad() {
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
    this.homePlacesList.getHotelList()
    .then(data => {
      this.list = data;
      this.listSearch = this.list;
    });
  }

  getRestaurantList(){
    this.homePlacesList.getRestaurantList()
    .then(data => {
      this.list = data;
      this.listSearch = this.list;
    });
  }

  getPlaceList(){
    this.homePlacesList.getPlaceList()
    .then(data => {
      this.list = data;
      this.listSearch = this.list;
    });
  }

  getBarList(){
    this.homePlacesList.getBarList()
    .then(data => {
      this.list = data;
      this.listSearch = this.list;
    });
  }

  filtrarLista() {
    this.listSearch = this.filerByName.filtro(this.list, this.busqueda);
  }

  goToPlace(){
    this.navCtrl.push(HomePlacePage);
  }
}
