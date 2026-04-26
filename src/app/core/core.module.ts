import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { HttpAuthInterceptor } from '@core/http-auth.interceptor';

@NgModule({
  providers: [
    { provide: AuthService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
