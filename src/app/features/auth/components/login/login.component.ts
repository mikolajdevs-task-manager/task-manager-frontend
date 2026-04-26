import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth.service';
import { AuthFormState } from '@features/auth/containers/auth/auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class LoginComponent {
  @Output() public authFormStateChange = new EventEmitter<AuthFormState>();

  protected readonly AuthFormState = AuthFormState;

  protected form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private authService: AuthService) {}

  protected get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  protected get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  @HostListener('keyup.enter')
  protected onEnter(): void {
    this.submit();
  }

  protected submit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value as any;
    this.authService.login({ email, password }).subscribe();
  }
}
