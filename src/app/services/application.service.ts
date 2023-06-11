import { Injectable } from '@angular/core';
import { Application } from 'src/models/Application';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from 'src/models/Response';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) { }

  public application: Application[] = [];
  getAll(): Observable<Response<Application[]>> {
    return this.http.get<Response<Application[]>>(`${environment.api.baseUrl}${environment.api.endpoints.application.getAllApplications}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Response<Application>> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.application.get}${id}`;
    return this.http.get<Response<Application>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(application: Application): Observable<Response<Application>> {
    return this.http.post<Response<Application>>(`${environment.api.baseUrl}${environment.api.endpoints.application.create}`,application)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(application: Application): Observable<Response<Application>> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.application.delete}${application.id}`;
    return this.http.delete<Response<Application>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(application: Application): Observable<Response<Application>> {
    return this.http.put<Response<Application>>(`${environment.api.baseUrl}${environment.api.endpoints.application.update}`, application	)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ha ocurrido un error:', error);
    return throwError('Error en el servicio. Por favor, inténtalo de nuevo más tarde.');
  }
}
