import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpAuthInterceptor} from '@core/http-auth.interceptor';
import {AuthService} from '@core/auth.service';

@NgModule({
  providers: [
    {provide: AuthService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    }
  ]
})
export class CoreModule {
}
