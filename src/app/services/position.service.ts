import { Injectable } from '@angular/core';
import {Position} from "../../models/Position";
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from 'src/models/Response';
@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http : HttpClient) { }
  public positions: Position[] = [];
  getAll(): Observable<Response<Position[]>> {
    return this.http.get<Response<Position[]>>(`${environment.api.baseUrl}${environment.api.endpoints.position.getAllPositions}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(position : Position): Observable<Response<Position>> {
    return this.http.post<Response<Position>>(`${environment.api.baseUrl}${environment.api.endpoints.position.create}`,position)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Response<Position>> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.position.get}${id}`;
    return this.http.get<Response<Position>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(position: Position): Observable<Response<Position>> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.position.delete}${position.id}`;
    return this.http.delete<Response<Position>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(position: Position): Observable<Response<Position>> {
    return this.http.put<Response<Position>>(`${environment.api.baseUrl}${environment.api.endpoints.position.update}`, position	)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any): Observable<never> {
    console.error('Ha ocurrido un error:', error);
    return throwError('Error en el servicio. Por favor, inténtalo de nuevo más tarde.');
  }
}
