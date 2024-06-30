import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Navigate } from '../enums/navigate-enums';

@Injectable({
  providedIn: 'root',
})
export class AnonymGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getCurrentUser().pipe(
      map((currentUser) => {
        if (currentUser) {
          this.router.navigate([Navigate.PRODUCT]);
          return false;
        }
        return true;
      })
    );
  }
}
