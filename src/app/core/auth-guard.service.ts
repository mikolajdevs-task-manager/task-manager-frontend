import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '@core/auth.service';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(map(user => !!user));
  }
}
