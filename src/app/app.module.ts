import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { GuestPageComponent } from './pages/guest-page/guest-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Error404Component } from './pages/error404/error404.component';
import { MainRoutingModule } from "./pages/main/main-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { AuthService } from "./services/auth.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthInterceptor } from "./services/auth.interceptor";
import { JWT_OPTIONS, JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./guards/auth.guard";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { OverlaySpinnerComponent } from './components/overlay-spinner/overlay-spinner.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from "xng-breadcrumb";
import { PositionTableComponent } from './components/position-table/position-table.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CandidateTableComponent } from './components/candidate-table/candidate-table.component';
import { ApplicationTableComponent } from './components/application-table/application-table.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestPageComponent,
    LoginPageComponent,
    Error404Component,
    OverlaySpinnerComponent,
    BreadcrumbComponent,
    PositionTableComponent,
    CandidateTableComponent,
    ApplicationTableComponent,
  ],
  imports: [
    MainRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      }

    }),
    BrowserAnimationsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    JwtModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSelectModule,
    BreadcrumbModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    },
    AuthGuard
  ],
    exports: [
        BreadcrumbComponent,
        PositionTableComponent,
        CandidateTableComponent,
        ApplicationTableComponent,
        OverlaySpinnerComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
