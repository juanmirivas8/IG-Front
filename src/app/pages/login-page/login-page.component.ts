import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth.service";
import {User} from "../../../models/User";
import {firstValueFrom} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  constructor(private fb:FormBuilder,private translateService:TranslateService,private authService:AuthService,
              private snack: MatSnackBar, private router:Router) {
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(4)])
    });
  }

  loginForm :FormGroup;

  ngOnInit() {}

  onSubmit(){
    let user: User = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    firstValueFrom(this.authService.login(user)).then(async (result) => {
      if(localStorage.getItem('user') != null){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      let userToStore = result.data;
      let stringUser = JSON.stringify(userToStore);
      localStorage.setItem('user',stringUser);
      localStorage.setItem('token',userToStore.token!);
      await this.router.navigate(['/main']);
    }).catch(async error =>{
      await this.snack.open('Error en la peticion','Ok',{duration: 3000});
    });
  }

   onRegister() {
    let user: User = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    firstValueFrom(this.authService.register(user)).then(async(result) => {
      await this.snack.open('Peticion correcta','Ok',{duration: 3000});
    }).catch(async error =>{
      await this.snack.open('Error en la peticion','Ok',{duration: 3000});
    });


  }
  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
