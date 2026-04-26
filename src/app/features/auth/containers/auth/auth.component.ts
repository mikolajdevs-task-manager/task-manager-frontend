import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum AuthFormState {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AuthComponent {
  protected readonly AuthFormState = AuthFormState;

  private authFormState = new BehaviorSubject<AuthFormState>(AuthFormState.LOGIN);
  protected authFormState$ = this.authFormState.asObservable();

  protected onAuthFormStateChange(state: AuthFormState): void {
    this.authFormState.next(state);
  }
}
