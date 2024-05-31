import { Component, Input, OnInit } from '@angular/core';
import { cities } from '../admin/model';
import { ModalController } from '@ionic/angular';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  @Input() city: cities; // Receive the city data
  Cities: cities = new cities();
  constructor(
    private modalController: ModalController,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    if (this.city) {
      this.Cities = { ...this.city }; // Copy the city data to avoid direct mutation
    }
  }

  async confirm() {
    if (this.Cities.id) {
      await this.adminService.tryUpdate(this.Cities);
      await this.adminService.presentAlert(
        'Success',
        'The data has been updated.'
      );
    } else {
      await this.adminService.tryAdd(this.Cities);
      await this.adminService.presentAlert(
        'Success',
        'The data has been added.'
      );
    }
    this.modalController.dismiss(this.Cities, 'confirm');
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<any>;
    if (ev.detail.role === 'confirm') {
      // Handle the confirm event
    }
  }
}
