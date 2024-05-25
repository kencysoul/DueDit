import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { cities, icities } from './model';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  cityList: icities[] = [];
  private cityListSubject: BehaviorSubject<icities[]> = new BehaviorSubject<
    icities[]
  >([]);
  public cityList$: Observable<icities[]> = this.cityListSubject.asObservable();

  constructor(
    private alertController: AlertController,
    private authenticationService: AuthService
  ) {
    this.loadCityList();
  }

  private async loadCityList() {
    const cityList = await this.getCity();
    this.cityListSubject.next(cityList);
  }
  async getCity(): Promise<icities[]> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const citylist: cities[] = [];
    // Retrieve cities
    const querySnapshot = await getDocs(collection(firestore, 'cities'));
    querySnapshot.forEach((doc) => {
      const Cities = doc.data() as cities;
      Cities.id = doc.id;
      citylist.push(Cities);
    });
    return citylist;
  }

  async tryAdd(city: cities) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRefM1 = await addDoc(collection(firestore, 'cities'), {
        name: city.name,
      });
      console.log('Document written with ID: ', docRefM1.id);
    } catch (e: any) {
      console.error('Error adding document: ', e);
      await this.presentAlert(
        'Error',
        'Failed to add the document, error: ' + e.message
      );
    }
  }
  async tryUpdate(city: cities) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, 'cities', city.id);
      await updateDoc(docRef, {
        id: city.id,
        name: city.name,
      });
    } catch (e: any) {
      console.error('Error adding document: ', e);
      await this.presentAlert(
        'Error',
        'Failed to add the document, error: ' + e.message
      );
    }
  }
  async tryDelete(city: cities) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);
    try {
      const docRef = doc(firestore, 'cities', city.id);
      await deleteDoc(docRef);
    } catch (e: any) {
      console.error('Error, adding document: ', e);
      await this.presentAlert(
        'Error',
        'Failed to add the document, error: ' + e.message
      );
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
