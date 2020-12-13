import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: Observable<any>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  loginEmail(user: User) {
    try {
      const { email, password } = user;
      return this.angularFireAuth
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error)
    }
      
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
