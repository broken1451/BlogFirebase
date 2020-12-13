import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // const user: User = {
    //   email: 'adrianbravo145@hotmail.com',
    //   password: '123456',
    // };

    // this.authService.loginEmail(user);
  }

  get login(){
    return this.loginForm;
  }


 async onLogin(){
   try {
     const user = await  this.authService.loginEmail(this.login.value);
     if (user) {
       console.log('Form', this.login.value)
       this.router.navigate(['/']);
     }
     console.log(user)
   } catch (error) {
     console.log(error)
   }
  }
}
