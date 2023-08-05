import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "xng-breadcrumb";
import {firstValueFrom} from "rxjs";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  appName: string="INNOVATION GROUP";

  constructor(private translateService: TranslateService,@Inject(MAT_DATE_LOCALE) private _locale:string,
              private _adapter: DateAdapter<any>) {
  }
  changeLanguage(lang: string) {
    this.translateService.use(lang);
    if(lang === 'es'){
      this._locale = 'es-ES';
      this._adapter.setLocale(this._locale);
    }else if(lang === 'en'){
      this._locale = 'en-GB';
      this._adapter.setLocale(this._locale);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
}
