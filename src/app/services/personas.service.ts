import {Personas} from './../models/personas';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http: HttpClient) {
  }

  get (params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      httpParams = httpParams.append(key, params[key]);
    });

    return this.http.get(`${environment.URL_BASE}/personas/listar`, {params: params})
      .map(r => r);
  }

  crearPersona(persona: Personas): Observable<any> {
    persona.id = null; // no es necesario pasar id
    return this.http.post(`${environment.URL_BASE}/personas/insertar`, persona);
  }

  modificarPersona(persona: Personas): Observable<any> {
    return this.http.put(`${environment.URL_BASE}/personas/modificar`, persona);
  }

  eliminarPersona(persona: Personas): Observable<any> {

    return this.http.delete(`${environment.URL_BASE}/personas/` + persona.id);
  }

}
