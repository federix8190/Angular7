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
export class UsuarioService {
  private listarUsuarioUrl = environment.URL_BASE + 'usuarios';
  private insertarUsuarioUrl = environment.URL_BASE + 'usuarios';
  private eliminarUsuarioUrl = environment.URL_BASE + 'usuarios/'
  private modificarUsuarioUrl = environment.URL_BASE + 'usuarios';
  private usuarioUrl = environment.URL_BASE + 'usuarios/';

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  getUsuarios(filtros: any): Observable<any> {

    return this.http.get(this.listarUsuarioUrl, {params: filtros}).map(r => r);
  }


  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.insertarUsuarioUrl, usuario)
      .pipe(
          catchError(this.handleError('Guardar usuario', usuario))
      );
  }

  modificarUsuario(persona: any): Observable<any> {
    return this.http.put(this.modificarUsuarioUrl, persona)
      .pipe(
        catchError(this.handleError('Modificar usuario', persona))
      );
  }

  eliminarUsuario(id: any): Observable<any> {
    return this.http.delete(this.eliminarUsuarioUrl + id)
      .pipe(
        catchError(this.handleError('Eliminar usuario', id))
      );
  }
  getUsuario(id: any): Observable<any>
  {
    return this.http.get(this.usuarioUrl + id).map(r => r);
  }
}
