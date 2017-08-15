import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map'
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    email:string;
    password:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {

    }
    signup(){
        this.http.post("http://redbutton_loopback.slapps.fr/api/Users",{
            email:"ste.luong2@gmail.com",
            password:"test"
        }).subscribe(data=>{
            console.log(data);
            this.navCtrl.push(LoginPage);
        });
    }
}
