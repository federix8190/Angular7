import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TipoConcursoService {
  private listarConcursoUrl = environment.URL_BASE + 'tipo-concurso';


  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  getTiposConcurso(filtros: any): Observable<any> {

    return this.http.get(this.listarConcursoUrl, {params: filtros}).map(r => r);
  }


}
