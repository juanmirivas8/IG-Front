import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import {PositionOverviewPageComponent} from "./position-overview-page/position-overview-page.component";
import {CandidateOverviewPageComponent} from "./candidate-overview-page/candidate-overview-page.component";
import {ApplicationOverviewPageComponent} from "./application-overview-page/application-overview-page.component";
import {PositionInfoPageComponent} from "./position-info-page/position-info-page.component";
import {CandidateInfoPageComponent} from "./candidate-info-page/candidate-info-page.component";
import {ApplicationInfoPageComponent} from "./application-info-page/application-info-page.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [{ path: 'main',canActivateChild:[AuthGuard], component: MainComponent,data:{breadcrumb:'breadcrumb_main'}, children: [
    { path: '', redirectTo: 'positions', pathMatch: 'full' },
    { path: 'positions',data:{breadcrumb:'breadcrumb_positions'}, children:[
        {path: '', component: PositionOverviewPageComponent},
        { path: 'newPosition', component: PositionInfoPageComponent,data:{breadcrumb:'breadcrumb_newPosition'}},
        { path: ':id', component: PositionInfoPageComponent,data:{breadcrumb:'breadcrumb_positionInfo'}},
      ]},
    { path: 'candidates', data:{breadcrumb:'breadcrumb_candidates'}, children:[
        {path: '', component: CandidateOverviewPageComponent},
        { path: 'newCandidate', component: CandidateInfoPageComponent,data:{breadcrumb:'breadcrumb_newCandidate'}},
        { path: ':id', component: CandidateInfoPageComponent,data:{breadcrumb:'breadcrumb_candidateInfo'}},
      ]},
    { path: 'applications', data:{breadcrumb:'breadcrumb_applications'}, children:[
        {path: '', component: ApplicationOverviewPageComponent},
        { path: 'newApplication', component: ApplicationInfoPageComponent,data:{breadcrumb:'breadcrumb_newApplication'}},
        { path: ':id', component: ApplicationInfoPageComponent,data:{breadcrumb:'breadcrumb_applicationInfo'}},
      ]},
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
