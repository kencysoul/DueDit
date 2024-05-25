import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static setAuthentication(arg0: boolean) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router) { this.fetch(); }
  authenticate = false;
  app : any;
  firestore : any;
  setAuthentication(auth: boolean) {
    if (auth) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'false');
    }
  }

  

  canActivate() {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  async login(email: string, password: string) { //called when clicked login
    const auth = getAuth();
    return await signInWithEmailAndPassword(auth, email, password); //using auth(), email, and password this will login the user
  }

  async signup(email: string, password: string) { //called when clicked signup
    const auth = getAuth();
    return await createUserWithEmailAndPassword(auth, email, password); //using email and password this will create a user
  }

  fetch() {
    this.app = initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore(this.app);
  }
}
