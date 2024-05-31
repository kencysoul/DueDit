import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegionService } from '../region.service';
import { cities, icities } from '../admin/model';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  user: any;
  Cities: cities = new cities();
  citylist: icities[] = [];
  isLoading = false;
  LoadingText: String = 'Loading...';

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    setTimeout(async () => {
      this.citylist = await this.adminService.getCity();
      this.isLoading = false;
    }, 2000);
  }

  logOut() {
    //back to login
    this.authService.setAuthentication(false);
    this.router.navigate(['login']);
  }
}
