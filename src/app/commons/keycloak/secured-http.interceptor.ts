import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';

import {Observable, from} from 'rxjs';

@Injectable()
export class SecuredHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    // console.log("interceptor: " + req.url);
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
      withCredentials: true
    });

    return next.handle(req);
  }
}
