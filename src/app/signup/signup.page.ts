import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword, } from 'firebase/auth';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: string = '';
  password: string = '';
  retypePassword: string = '';
  
  constructor(private alertController: AlertController, private router: Router,
    private AuthService : AuthService) { }

  ngOnInit() {
  }

  async signup() {
    if (!this.email || !this.password || !this.retypePassword) {
      this.presentAlert('Error', 'Please fill in all fields.');
      return;
    }
    if (!this.email.includes('@') && !this.email.includes('.')) {
      this.presentAlert('Error', 'Please input a valid email.')
    }
    if (this.password !== this.retypePassword) {
      this.presentAlert('Error', 'Passwords do not match.');
      return;
    }
    if ((this.password.length && this.retypePassword.length) < 6) {
      this.presentAlert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password) //using email and password this will create a user
      .then((userCredential) => {
        // signed up
        // console.log(userCredential);
        const user = userCredential.user;
        this.presentAlert('Success', 'Sign up successful!');
        this.router.navigate(['login']);
      })
      .catch((error) => { //if has error, this will run
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
      });

    this.email = '';
    this.password = '';
    this.retypePassword = '';
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
