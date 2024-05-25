import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasPlan: boolean = true;
  noPlan: boolean = false;
  today: number = Date.now();

  constructor(private router : Router, private authService : AuthService) {}

  switch(){
    if(this.hasPlan){
      this.hasPlan = false;
      this.noPlan = true;
    } else {
      this.hasPlan = true;
      this.noPlan = false;
    }
  }

  logOut() { //back to login
    this.authService.setAuthentication(false);
    this.router.navigate(['login']);
  }
}
