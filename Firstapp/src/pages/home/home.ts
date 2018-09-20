import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';


import { ServiceProvider } from '../../providers/service/service';

import { DetailPage } from '../detail/detail'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any;


  constructor(public navCtrl: NavController, public restProvider: ServiceProvider) {
    this.getUsers();

  }


  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }


  onUserClick(data){
    console.log(data);
    this.navCtrl.push(DetailPage, {
      "data": data
    });
  }


}
