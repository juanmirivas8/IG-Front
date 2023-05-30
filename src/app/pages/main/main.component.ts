import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "xng-breadcrumb";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent{
  appName: string="INNOVATION GROUP";

  constructor(private translateService: TranslateService) {
  }
  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
