import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoGuardGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = next.data.requiredRoles;
    const realRol = (this.tokenService.isAdmin()? 'admin' : 'user');
    if (!this.tokenService.getToken() || requiredRoles.indexOf(realRol) === -1) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
