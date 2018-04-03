import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class MapsPage {
 
  @ViewChild('map') mapElement: ElementRef;
  
  constructor(public navCtrl: NavController,public maps: GoogleMapsProvider) {}
  
  ionViewDidLoad() {
    this.maps.init(this.mapElement.nativeElement, (latLng) => {
      console.log(latLng.lat() + ', ' + latLng.lng());
    }).then(() => {
    });
  }
}
