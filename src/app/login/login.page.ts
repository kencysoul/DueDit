import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private router : Router,
    private authenticationService : AuthService,
    private alertController : AlertController
  ) { }

  ngOnInit() {
  }

  async login() { 
    this.authenticationService.login(this.email, this.password) //using auth(), email, and password this will login the user
      .then((userCredential) => {
        // signed in
        console.log(userCredential);
        const user = userCredential.user;
        
        if (user.uid == environment.accessCode) {
          this.authenticationService.setAuthentication(true);
          this.authenticationService.authenticate = true;
          this.presentAlert('Success', 'Welcome Admin ' + user.displayName);
          this.router.navigate(['admin']); // Redirect to admin dashboard
        } else {
          this.authenticationService.setAuthentication(true);
          this.authenticationService.authenticate = true;
          this.presentAlert('Success', 'Welcome ' + user.displayName);
          this.router.navigate(['dashboard/home']); // Redirect to regular user dashboard
        }

        // this.authenticationService.setAuthentication(true);
        // this.authenticationService.authenticate = true;
        // this.presentAlert('Success', 'Welcome ' + user.displayName); //displays user name
        // this.router.navigate(['dashboard']);
        // console.log(this.authenticationService.authenticate);
      })
      .catch((error) => { //if has error, this will run
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        this.presentAlert('Error', 'Invalid Email or Password.')
      })
      .finally(() => {
        this.email = '';
        this.password = '';
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  gotoSignUp() {
    this.router.navigate(['signup']);
  }
}
