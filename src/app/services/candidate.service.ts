import { Injectable } from '@angular/core';
import { Candidate } from 'src/models/Candidate';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from 'src/models/Response';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http : HttpClient) { }
  getAll(): Observable<Response<Candidate[]>> {
    return this.http.get<Response<Candidate[]>>(`${environment.api.baseUrl}${environment.api.endpoints.candidate.getAllCandidates}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  create(candidate: Candidate): Observable<Response<Candidate>> {
    return this.http.post<Response<Candidate>>(`${environment.api.baseUrl}${environment.api.endpoints.candidate.create}`,candidate)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Response<Candidate>> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.candidate.get}${id}`;
    return this.http.get<Response<Candidate>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(candidate: Candidate): Observable<Response<Candidate>> {
    const url = `${environment.api.baseUrl}${environment.api.endpoints.candidate.delete}${candidate.id}`;
    return this.http.delete<Response<Candidate>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(candidate: Candidate): Observable<Response<Candidate>> {
    return this.http.put<Response<Candidate>>(`${environment.api.baseUrl}${environment.api.endpoints.candidate.update}`, candidate	)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ha ocurrido un error:', error);
    return throwError('Error en el servicio. Por favor, inténtalo de nuevo más tarde.');
  }
  public candidates: Candidate[] = [];
}
