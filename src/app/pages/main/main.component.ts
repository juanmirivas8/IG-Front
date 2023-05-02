import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  appName: String="INNOVATION GROUP";

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
