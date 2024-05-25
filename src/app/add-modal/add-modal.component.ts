import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { cities, icities } from '../admin/model';
import { AdminService } from '../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit {
  Cities: cities = new cities();
  name: string;
  constructor(
    private modalController: ModalController,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {}

  async confirm() {
    this.adminService.tryAdd(this.Cities);
    this.adminService.presentAlert('Success', 'The data has been added.');
    this.modalController.dismiss(this.name, 'confirm');
    this.Cities = new cities();
    // this.adminService.cityList = await this.adminService.getCity();
  }
  cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }
}
