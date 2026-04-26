import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {AppPath} from '../app-routing.model';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedOnlyGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    const token = this.authService.authToken;
    if (token) {
      this.router.navigate([AppPath.dashboard]);
      return false;
    }
    return true;
  }
}
