import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): null => {
    const password = group.get(passwordKey);
    const password2 = group.get(confirmKey);

    if (!password || !password2) return null;

    if (password.value !== password2.value) {
      password2.setErrors({ passwordsMismatch: true });
    } else {
      if (password2.hasError('passwordsMismatch')) {
        password2.setErrors(null);
      }
    }
    return null;
  };
}
