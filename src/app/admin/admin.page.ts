import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from './admin.service';
import { cities, icities } from './model';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  Cities: cities = new cities();
  citylist: icities[] = [];
  isLoading = false;
  LoadingText: String = 'Loading...';

  constructor(
    private adminService: AdminService,
    private alertController: AlertController,
    private modalController: ModalController,
    private route: Router
  ) {}

  ngOnInit() {
    this.adminService.cityList$.subscribe((cityList) => {
      this.citylist = cityList;
      this.isLoading = false;
    });
  }

  async ionViewWillEnter() {
    this.citylist = await this.adminService.cityList;
    console.log(this.citylist);
    this.cities();
  }

  async toggleModal() {
    const modal = await this.modalController.create({
      component: AddModalComponent,
    });
    modal.onDidDismiss().then(async (data) => {
      if (data.role === 'confirm') {
        // Update city list if data was confirmed
        this.citylist = await this.adminService.getCity();
      }
    });
    return await modal.present();
  }

  async cities() {
    this.isLoading = true;
    setTimeout(async () => {
      this.citylist = await this.adminService.getCity();
      this.isLoading = false;
    }, 2000);
  }

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  confirm() {
    if (this.Cities.id) {
      this.adminService.tryUpdate(this.Cities);
      this.adminService.presentAlert('Update', 'The data has been updated.');
    } else {
      this.adminService.tryAdd(this.Cities);
      this.adminService.presentAlert('Success', 'The data has been added.');
    }
    this.Cities = new cities();
    this.cities();
  }

  async delete(City: cities) {
    this.isLoading = true;
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete this city?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.adminService.tryDelete(City);
            this.adminService.presentAlert(
              'Success',
              'The data has been deleted.'
            );
            this.cities();
            this.Cities = new cities();
            this.isLoading = false;
          },
        },
      ],
    });
    await alert.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  edit(City: cities) {
    this.Cities = City;
    console.log(City);
    this.toggleModal()
  }

  synch(City: cities) {
    this.Cities.name = City.name;
    console.log(City);
  }

  logout() {
    this.route.navigate(['login']);
    localStorage.removeItem('user');
  }
}
