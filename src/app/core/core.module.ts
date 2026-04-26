import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpAuthInterceptor } from '@core/http-auth.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import packageJson from '../../../package.json';

const version = packageJson.version;

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: provideTranslateHttpLoader({ prefix: './assets/i18n/', suffix: '.json?cacheBuster=' + version })
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
