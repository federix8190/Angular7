import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public headers: Headers;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(username: string, password: string, rememberMe: boolean): Observable<any> {


    /*if (password == 'demo' && username == 'demo') {
      localStorage.setItem('autenticado', 'true');
      return new Observable((observer) => {
        // observable execution
        observer.next('true');
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        // observable execution
        observer.error('false');
        observer.complete();
      });
    }*/
    let data = {
      "username": username,
      "password": password
    };

    return this.http.post(environment.URL_BASE+"session/login", JSON.stringify(data)  );

    /**
     * En caso de ser necesario, armar el body para la autenticacion
     */

    // let data = {
    //   username: username,
    //   password: password,
    //   rememberMe: rememberMe,
    //   host: "localhost"
    // }

    // Llamar al servicio de autenticacion
    // return this.http.post(environment.URL_LOGIN, data, httpOptions);
  }
  logout(): Observable<any>
  {
    return this.http.post(environment.URL_BASE+"session/logout", null);
  }


}
