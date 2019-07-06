import {Injectable} from '@angular/core';
import {Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private cookieService: CookieService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('autenticado') == 'true') {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
