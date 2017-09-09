import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Http } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { ConfigurationPage } from '../configuration/configuration';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage { 
    sent:boolean;
    userId:string;
    email:string;
    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
        var token = this.navParams.get("token");
        this.userId = this.navParams.get("userId");
        this.email= this.navParams.get("email");
        console.log("USERID:"+this.userId);
	this.sent = false;
    }
    goToSignup(){
        this.navCtrl.push(SignupPage);
    }
    goToLogin(){
        this.navCtrl.push(LoginPage);
    }
    goToConfiguration(){
        this.navCtrl.push(ConfigurationPage,{
            userId:this.userId,
            email:this.email
        });
    }
    trigger(){
        this.http.post("https://redbutton-node.slapps.fr/",{
            userId:this.userId,
            //TODO PUT in NODE
            email:this.email,
        }).subscribe(data => {
            console.log(data);
            this.sent = true;
        });
    }

}
