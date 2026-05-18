import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpAuthInterceptor } from '@core/http-auth.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import packageJson from '../../../package.json';
import { authCodeFlowConfig } from '../app.config';

const version = packageJson.version;

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () =>
    new Promise<void>((resolve) => {
      oauthService.configure(authCodeFlowConfig);
      oauthService.setupAutomaticSilentRefresh();

      const params = new URLSearchParams(window.location.search);
      if (window.location.search && !params.has('code')) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      oauthService
        .loadDiscoveryDocumentAndLogin()
        .then(() => {
          if (window.location.search) {
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          document.getElementById('startup-overlay')?.remove();
          resolve();
        })
        .catch(() => {
          const msg = document.getElementById('startup-msg');
          if (msg) msg.innerHTML = 'Server is waking up after inactivity.<br>Page will refresh automatically in <span id="cd">60</span>s.';
          let t = 60;
          const iv = setInterval(() => {
            const el = document.getElementById('cd');
            if (el) el.textContent = String(--t);
            if (t <= 0) { clearInterval(iv); window.location.reload(); }
          }, 1000);
          resolve();
        });
    });
}

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
    },
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      multi: true,
      deps: [OAuthService]
    }
  ]
})
export class CoreModule {}
