import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { CandidateInfoPageComponent } from './candidate-info-page/candidate-info-page.component';
import { CandidateOverviewPageComponent } from './candidate-overview-page/candidate-overview-page.component';
import { PositionOverviewPageComponent } from './position-overview-page/position-overview-page.component';
import { ApplicationOverviewPageComponent } from './application-overview-page/application-overview-page.component';
import { PositionInfoPageComponent } from './position-info-page/position-info-page.component';
import { ApplicationInfoPageComponent } from './application-info-page/application-info-page.component';
import { AuxDataPageComponent } from './aux-data-page/aux-data-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    MainComponent,
    CandidateInfoPageComponent,
    CandidateOverviewPageComponent,
    PositionOverviewPageComponent,
    ApplicationOverviewPageComponent,
    PositionInfoPageComponent,
    ApplicationInfoPageComponent,
    AuxDataPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    TranslateModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
  ]
})
export class MainModule { }
