import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import { ListPage } from '../list/list';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    userId:string;
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
        var token = this.navParams.get("token");
        this.userId = this.navParams.get("userId");
        console.log("USERID:"+this.userId);
    }
    goToList(){
        this.navCtrl.push(ListPage);
    }
    goToSignup(){
        this.navCtrl.push(SignupPage);
    }
    goToLogin(){
        this.navCtrl.push(LoginPage);
    }

    trigger(){
        this.http.post("http://redbutton_node.slapps.fr/",{
            user:"s",
            email:"ste.luong@gmail.com",
            dest:"ste.luong@gmail.com",
            subject:"Hello !",
            message:"Hello, tout va bien ?"
        }).subscribe(data => {
            console.log(data);
        });
    }
    test(){
        this.http.post("http://redbutton_node.slapps.fr/",{
            user:"s",
            email:"ste.luong@gmail.com",
            dest:"ste.luong@gmail.com",
            subject:"TEST!",
            message:"TEST TEST TEST"
        }).subscribe(data => {
            console.log(data);
        });
    }

}
