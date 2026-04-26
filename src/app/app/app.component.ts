import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '@core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AppComponent {
  protected user$;

  constructor(protected authService: AuthService) {
    this.user$ = this.authService.user$;
  }
}
