import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppPath } from '../app-routing.model';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  id: string;
}

export interface Authentication {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt';
  private user = new BehaviorSubject<User | null>(null);
  private _user$ = this.user.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  public login(request: AuthRequest): Observable<Authentication> {
    return this.httpClient.post<Authentication>('/login', request).pipe(
      tap((response) => {
        console.log(response);
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.storeUser(response.user);
        this.router.navigate([AppPath.dashboard]);
      })
    );
  }

  public register(request: AuthRequest): Observable<Authentication> {
    return this.httpClient.post<Authentication>('/register', request).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.storeUser(response.user);
        this.router.navigate([AppPath.dashboard]);
      })
    );
  }

  public getUser(): Observable<User> {
    // TODO /transactions -> /me
    // return this.httpClient.get<User>('/api/me').pipe(tap((user: User) => this.storeUser(user)));
    return this.httpClient.get<User>('/api/transactions').pipe(tap((user: User) => this.storeUser(user)));
  }

  public get authToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.redirect(AppPath.auth);
  }

  public get user$(): Observable<User | null> {
    return this._user$;
  }

  private storeUser(user: User): void {
    this.user.next(user);
  }

  private redirect(url: string): void {
    window.location.href = url;
  }
}
