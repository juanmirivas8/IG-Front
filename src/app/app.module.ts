import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { GuestPageComponent } from './pages/guest-page/guest-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { Error404Component } from './pages/error404/error404.component';
import {MainRoutingModule} from "./pages/main/main-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {AuthService} from "./services/auth.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./services/auth.interceptor";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth.guard";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    GuestPageComponent,
    LoginPageComponent,
    Error404Component,
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
        MatProgressSpinnerModule
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
