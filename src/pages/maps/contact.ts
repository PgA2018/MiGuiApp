import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { HomeProvider } from '../../providers/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePlacePage } from '../home-place/home-place';

declare var google;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class MapsPage {
 
  @ViewChild('map') mapElement: ElementRef;
  
  map: any;
  marker: any;
  apiKey: string = "AIzaSyA3uv4zlpr1Yi4Hb0h7rB7xXLNiePeBEc0";
  centerChangedCallback: any;
  markers;
  infoWindow;
  busqueda: string = '';
  marcadores = [];

  constructor(public navCtrl: NavController,public maps: GoogleMapsProvider, public geolocation: Geolocation,public homeProvider: HomeProvider, public alertCtrl: AlertController) {
    this.getHotel();
  }
  
  ionViewDidLoad() {
    this.init(this.mapElement.nativeElement, (latLng) => {
      console.log(latLng.lat() + ', ' + latLng.lng());
    }).then(() => {
    });
  }

  getHotel(){
    this.homeProvider.getMapaAll()
    .then(data => {
      this.markers = data;
    });
  }

  init(mapElement: any, centerChangedCallback: any): Promise<any> {
    this.mapElement = mapElement;
    this.centerChangedCallback = centerChangedCallback;
    return this.loadMap();
  }

  loadMap(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google == 'undefined' || typeof google.maps == "undefined") {
        window['mapInit'] = () => {
          this.initMap().then(() => {
            resolve(true);
          });
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  }

  initMap(): Promise<any> {
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: center,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          tilt: 30
        }
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.pushSpin(this.map);
        resolve(true);
      });
    });
  }

  pushSpin(mapa){
    for (let m of this.markers) {
      console.log(m.CategoriaLugars[0].Categorium.nombre);
      
      let posicion = new google.maps.LatLng(m.latitud, m.longitud);
      this.marcadores.push(new google.maps.Marker({
        title: m.nombre,
        description: m.CategoriaLugars[0].Categorium.nombre,
        position: posicion,
        draggable:false,
      }));
      this.marcadores[this.marcadores.length - 1].setMap(mapa);
      this.marcadores[this.marcadores.length - 1].addListener('click', () => {
        console.log("me aplastan "+m.nombre);
        this.presentAlert(m.nombre, m.descripcion,m.id);
      });
    }
  }

  filtrarLista() {
    for (let i = 0; i < this.marcadores.length; i++) {
      if( (this.marcadores[i].title.toLowerCase().indexOf(this.busqueda.toLowerCase()) >= 0) || (this.marcadores[i].description.toLowerCase().indexOf(this.busqueda.toLowerCase())  >= 0) ){
        this.marcadores[i].setVisible(true);
      }else{
        this.marcadores[i].setVisible(false);
      }
    }
  }

  presentAlert(titulo, descripcion,id) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: descripcion,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ir al lugar',
          handler: data => {
            this.navCtrl.push(HomePlacePage,{
              id : id
            })
          }
        }
      ]
    });
    alert.present();
  }
}
