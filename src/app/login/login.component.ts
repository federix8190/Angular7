import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showPass: any = false;
  showMessage: any = false;
  loginMessage: string = '';
  loginForm: FormGroup;
  validUsername: any = false;
  validPassword: any = false;
  disabledButton: any = false;
  constructor(private fb: FormBuilder, private authentication: AuthenticationService,
    private cookieService: CookieService, public router: Router) {
    this.crearControles();
  }

  ngOnInit() {

  }
  crearControles() {
    this.loginForm = this.fb.group( {
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  toggleShowPass() {
    if (this.showPass) {
      this.showPass = false;
    } else {
      this.showPass = true;
    }
  }

  valid() {
    this.validUsername = this.loginForm.controls['username'].valid;
    this.validPassword = this.loginForm.controls['password'].valid;
  }

  login() {
    this.valid();
    this.disabledButton = true;
    this.loginForm.disable();
    if (this.validUsername && this.validPassword) {
      this.authentication.login( this.loginForm.controls['username'].value, this.loginForm.controls['password'].value,
        true).subscribe(response => {
          console.log(response);
          if (response.error!)
          {
            this.loginMessage = response.mensaje;
          }
          else
          {
            localStorage.setItem('autenticado','true');
            this.router.navigate(['home']);
          }
        },
        error => {
          this.loginForm.enable();
          console.log(error);
          this.disabledButton = false;
          console.log('Username or password is incorrect');
          this.showMessage = true;
          this.loginMessage = 'Usuario y/o contraseña es incorrecta!'
        },
        () => {
          this.loginForm.enable();
          this.disabledButton = false;
        });
    } else {
      this.showMessage = true;
      this.loginMessage = 'Usuario y/o contraseña invalidas!'
    }
  }

}
