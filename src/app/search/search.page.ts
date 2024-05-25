import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegionService } from '../region.service';
import { region } from '../model/region.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  user: any;

  regions : region[] = [];
  
  constructor(private router : Router, private authService : AuthService,
    private regionService : RegionService) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    await this.regionService.fetchData().subscribe((responses) => {
      this.regions = responses;
      console.log(responses);
    });
  }

  logOut() { //back to login
    this.authService.setAuthentication(false);
    this.router.navigate(['login']);
  }
}
