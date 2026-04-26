import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output} from '@angular/core';
import {AuthService} from '@core/auth.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthFormState} from '@features/auth/containers/auth/auth.component';
import {passwordMatchValidator} from '@features/auth/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class RegisterComponent {
  @Output() public authFormStateChange = new EventEmitter<AuthFormState>()

  protected readonly AuthFormState = AuthFormState;
  protected readonly usedEmails = new Set<string>();
  protected form = new FormGroup(
    {
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        this.forbiddenEmailValidator()
      ]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
    },
    {validators: passwordMatchValidator('password', 'password2')}
  );

  constructor(private authService: AuthService) {
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get password2(): FormControl {
    return this.form.get('password2') as FormControl;
  }

  @HostListener('keyup.enter')
  protected onEnter(): void {
    this.submit();
  }

  protected submit(): void {
    console.log(this.form);
    if (this.form.invalid) return;
    const {email, password} = this.form.value as any;
    this.authService.register({email, password}).subscribe({
        next: () => {
          // registration successful
        },
        error: (err) => {
          if (err.status === 409) {
            const currentEmail = this.email?.value?.toLowerCase();
            if (currentEmail) {
              this.usedEmails.add(currentEmail);
              this.email?.updateValueAndValidity(); // trigger validator recheck
            }
          }
        },
      }
    );
  }


  private forbiddenEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase();
      if (value && this.usedEmails.has(value)) {
        return {emailTaken: true};
      }
      return null;
    };
  }
}
