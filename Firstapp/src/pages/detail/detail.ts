import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsAnimation,
  Marker,
  GoogleMapsEvent,
  ILatLng
} from '@ionic-native/google-maps';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  toastCtrl: any;
  map: any;
  result: any;



  constructor(public navCtrl: NavController, public navParams: NavParams,public  googleMaps: GoogleMaps) {

    this.result = this.navParams.get("data");

    console.log("RESULT "+JSON.stringify(this.result));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.loadMap();

  }


  loadMap() {

    let initialPos: ILatLng = {lat: this.result.address.geo.lat, lng: this.result.address.geo.lng};


    this.map = GoogleMaps.create('map', {
      'camera': {
        'target': {
          "lat": this.result.address.geo.lat,
          "lng": this.result.address.geo.lng
        },
        'zoom': 2
      }
    });

     

    // add a marker
    let marker: Marker = this.map.addMarkerSync({
      title: '@ionic-native/google-maps plugin!',
      snippet: 'This plugin is awesome!',
      position:  initialPos,
      animation: GoogleMapsAnimation.BOUNCE
    });

    // show the infoWindow
    marker.showInfoWindow();

    // If clicked it, display the alert
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.showToast('clicked!');
    });

  }


  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

}
