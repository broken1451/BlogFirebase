import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { File } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData$: Observable<any>;
  public filePath: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStorage: AngularFireStorage
  ) {
    this.userData$ = angularFireAuth.authState;
  }

  loginEmail(user: User) {
    try {
      const { email, password } = user;
      return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  // actualizar profile
  private  async saveUser(user: User) {
    (await this.angularFireAuth.currentUser)
      .updateProfile({
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
      .then((user) => console.log('User updated', user))
      .catch((err) => console.log('error', err));
  }

  preSaveUserProfile(user: User, img?: File) {
    if (img) {
      this.uploadImg(user, img);
    } else {
      this.saveUser(user)
    }
  }

  uploadImg(user: User, img: File) {
    this.filePath = `images/${img.name}`;
    const fileRef = this.angularFireStorage.ref(this.filePath);
    const taks = this.angularFireStorage.upload(this.filePath, img);
    taks
      .snapshotChanges()
      .pipe(
        finalize(() => {
          // devuelve la url de la img
          fileRef.getDownloadURL().subscribe((urlImg) => {
            console.log({ urlImg, user });
            user.photoURL = urlImg;
            // call addPost()
            this.saveUser(user);
          });
        })
      )
      .subscribe();
  }
}
