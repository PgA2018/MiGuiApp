import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeServicesListProvider } from '../../providers/home-services-list/home-services-list';
import { FilterByNameProvider } from '../../providers/filter-by-name/filter-by-name';
import { HomeServicePage } from '../home-service/home-service';

@IonicPage()
@Component({
  selector: 'page-home-services-list',
  templateUrl: 'home-services-list.html',
})
export class HomeServicesListPage {

  list;
  listSearch;
  title: string;
  busqueda: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public homeServicesList: HomeServicesListProvider, public filerByName : FilterByNameProvider) {
  }

  ionViewDidLoad() {
    this.getServiceList(this.navParams.get('id'));
  }

  getServiceList(id){
    this.homeServicesList.getServiceList(id)
    .then(data => {
      this.list = data;
      this.listSearch = this.list;
      console.log(this.list);
    });
  }
  filtrarLista() {
    this.listSearch = this.filerByName.filtro(this.list, this.busqueda);
  }
  goToService(id){
    this.navCtrl.push(HomeServicePage,{
      id: id
    });
}

}
