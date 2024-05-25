import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {

  constructor(private router : Router, private authService : AuthService) { }

  ngOnInit() {
  }


  addPlan(){
    
  }

  logOut() { //back to login
    this.authService.setAuthentication(false);
    this.router.navigate(['login']);
  }
}
