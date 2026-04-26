import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthService} from '@core/auth.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private errorHandler: ErrorHandler) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    const token = this.authService.authToken;
    if (token) {
      request = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }
    return next.handle(request).pipe(
      tap({
        error: (error: HttpErrorResponse) => {
          if (!(error instanceof HttpErrorResponse)) {
            console.error('Interceptor error:', error)
          }
          if (error.status === 401) {
            this.authService.logout();
            return;
          }
          this.errorHandler.handleError(error);
        }
      })
    );
  }
}
