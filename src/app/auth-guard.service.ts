import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { GifService } from './gif.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public service: GifService, private router: Router, private route: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.service.isAuth) {
      return true;
    } else {
      this.router.navigate(['']);
    }

  }

}
