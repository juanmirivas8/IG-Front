import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Error404Component} from "./pages/error404/error404.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {GuestPageComponent} from "./pages/guest-page/guest-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) }
  ,
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'guest',
    component: GuestPageComponent,
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
