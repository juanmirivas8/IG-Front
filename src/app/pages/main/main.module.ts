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
    MainRoutingModule
  ]
})
export class MainModule { }
