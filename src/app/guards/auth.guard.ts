import {Inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanActivateChild,
  CanLoad, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../../models/User";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Token} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad,CanActivate,CanActivateChild {
  constructor(@Inject(JwtHelperService)private jwtHelper:JwtHelperService, private route:Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let stringUser = localStorage.getItem('user');
    if(stringUser == null){
      this.route.navigate(['/login']);
      return false;
    }
    let storedUser:User = JSON.parse(stringUser);
    if(this.jwtHelper.isTokenExpired(storedUser.token!)){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['/login'])
      return false;
    }
    return true;
    }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let stringUser = localStorage.getItem('user');
    if(stringUser == null){
      this.route.navigate(['/login']);
      return false;
    }
    let storedUser:User = JSON.parse(stringUser);
    if(this.jwtHelper.isTokenExpired(storedUser.token!)){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['/login'])
      return false;
    }
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let stringUser = localStorage.getItem('user');
    if(stringUser == null){
      this.route.navigate(['/login']);
      return false;
    }
    let storedUser:User = JSON.parse(stringUser);
    if(this.jwtHelper.isTokenExpired(storedUser.token!)){
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['/login'])
      return false;
    }
    return true;
  }
}
