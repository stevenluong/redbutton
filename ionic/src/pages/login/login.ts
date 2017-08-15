import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map'
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    email:string;
    password:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    }
    login(){
        this.http.post("http://redbutton_loopback.slapps.fr/api/Users/login",{
            email:"ste.luong@gmail.com",
            password:"test"
        }).subscribe(data=>{
            console.log(data);
            var token = data.json().id;
            var userId = data.json().userId;
            console.log(token);
            console.log(userId);
            this.navCtrl.push(HomePage,{
                token:token,
                userId:userId
            });
        });
    }

}
