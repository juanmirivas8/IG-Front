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
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BreadcrumbModule} from "xng-breadcrumb";
import {AppModule} from "../../app.module";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {ReactiveFormsModule} from "@angular/forms";

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
        MatIconModule,
        MatMenuModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        BreadcrumbModule,
        AppModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        ReactiveFormsModule,
    ]
})
export class MainModule { }
