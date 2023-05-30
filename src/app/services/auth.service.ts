import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Response} from "../../models/Response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogging$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) { }
  public register(user:User) : Observable<Response<boolean>>{
    return this.http.post<Response<boolean>>(`${environment.api.baseUrl}${environment.api.endpoints.authRegister}`,user);
  }

  public login(user:User) : Observable<Response<User>>{
    return this.http.post<Response<User>>(`${environment.api.baseUrl}${environment.api.endpoints.authLogin}`,user);
  }

}
