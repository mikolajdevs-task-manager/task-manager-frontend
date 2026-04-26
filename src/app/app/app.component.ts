import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AppComponent {
  protected user$;

  constructor(
    private translateService: TranslateService,
    protected authService: AuthService
  ) {
    this.user$ = this.authService.user$;
  }

  public ngOnInit(): void {
    this.translateService.setFallbackLang('en');
    this.translateService.use('en');
  }
}
