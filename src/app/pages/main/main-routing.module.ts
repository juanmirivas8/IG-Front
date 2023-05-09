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

const routes: Routes = [{ path: 'main',canActivateChild:[AuthGuard], component: MainComponent, children: [
    { path: '', redirectTo: 'positions', pathMatch: 'full' },
    { path: 'positions', component: PositionOverviewPageComponent},
    { path: 'candidates', component: CandidateOverviewPageComponent},
    { path: 'applications', component: ApplicationOverviewPageComponent},
    { path: 'positions/:id', component: PositionInfoPageComponent},
    { path: 'candidates/:id', component: CandidateInfoPageComponent},
    { path: 'applications/:id', component: ApplicationInfoPageComponent},
    { path: 'newPosition', component: PositionInfoPageComponent},
    { path: 'newCandidate', component: CandidateInfoPageComponent},
    { path: 'newApplication', component: ApplicationInfoPageComponent}

  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
