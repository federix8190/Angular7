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
export class RolService {
  private listarRolLUrl = environment.URL_BASE + 'roles';
  private listarRolLAsigUrl = environment.URL_BASE + 'usuarios/roles';
  private asigRolUrl = environment.URL_BASE + 'roles/asignar/';

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  getRoles(filtros: any): Observable<any> {
    console.log("Parametros ");
    console.log(filtros);
    return this.http.get(this.listarRolLUrl, {params: filtros}).map(r => r);
  }
  getRolesAsig(id:any): Observable<any>
  {

    return this.http.get(this.listarRolLAsigUrl+"/"+id).map(r => r);
  }
  guardarRolesUsuarios(id:any, roles:any): Observable<any> {
    {
      return this.http.post<any>(this.asigRolUrl  + id, roles)
        .pipe(
          catchError(this.handleError('Guardar asignacion rol', roles))
        );
    }
  }

}
