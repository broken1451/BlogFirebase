import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user.interface';
import { File } from '../../../shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photo: new FormControl('', Validators.required),
  });

  public image: File;
  public currentImage: string = 'https://i.picsum.photos/id/364/200/200.jpg?hmac=wN2-1fE2NpZHjoUsBhb3BfnYFXmdmhd-DVhDqHG_Kg0';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // TODO  this.initvalue(user)
    this.authService.userData$.subscribe((user: User) => {
      this.initValue(user);
    });
  }

  private initValue(user: User) {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
  }

  saveUser() {
    console.log(this.profileForm.value);
    // this.authService.saveUser(this.profileForm.value, this.image);
    this.authService.preSaveUserProfile(this.profileForm.value, this.image);
  }

  handleImg(img: File) {
    this.image = img;
    console.log(img)
  }
}
