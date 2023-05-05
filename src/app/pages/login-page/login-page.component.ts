import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  constructor(private fb:FormBuilder,private translateService:TranslateService) {
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(4)])
    });
  }

  loginForm :FormGroup;

  ngOnInit() {}

  onSubmit(){
    console.log(this.loginForm.value);
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
