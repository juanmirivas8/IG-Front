import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "../../services/auth.service";
import {User} from "../../../models/User";
import {firstValueFrom} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Response} from "../../../models/Response";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  spinner = true;
  constructor(private fb:FormBuilder,private translateService:TranslateService,public authService:AuthService,
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
    this.authService.isLogging$.next(true);
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
      console.log(error);
      if(error instanceof HttpErrorResponse && error.status == 400){
        let response = error.error as Response<User>;
        let message = response.message;
        if (message == 'Username is wrong'){
          await this.snack.open(this.translateService.instant('login_snack_error_wrong_username'),'Ok',{duration: 3000});
        }else if (message == 'Password is wrong') {
          await this.snack.open(this.translateService.instant('login_snack_error_wrong_password'), 'Ok', {duration: 3000});
        }
      }else{
        await this.snack.open(this.translateService.instant('login_snack_error'), 'Ok', {duration: 3000});
      }
    }).finally(()=>{
      this.authService.isLogging$.next(false);
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
