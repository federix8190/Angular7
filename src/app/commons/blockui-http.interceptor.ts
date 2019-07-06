import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {BlockUI, BlockUIService, NgBlockUI} from 'ng-block-ui';
import {Router} from '@angular/router';

@Injectable()
export class BlockuiHttpInterceptor implements HttpInterceptor {
  constructor(private blockUIS: BlockUIService, private router:Router) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
      this.blockUIS.start('ui');
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json'),
        withCredentials: true
      });
      return next.handle(req)
      .map((event: HttpEvent<any>) => {
        console.log("Event ", event)
        if (event instanceof HttpResponse) {
          // TODO Controlar estado de Respuesta

        }
        setTimeout(() => {
          this.blockUIS.stop('ui');
        }, 1000);
        return event;
      })
      .catch((err: any, caught) => {
        if (err.status == 401)
        {
          this.router.navigate(['/login']);
          localStorage.removeItem("autenticado");
        }
        setTimeout(() => {
          this.blockUIS.stop('ui');
        }, 1000);
        return Observable.throw(err);
      });
  }

}
