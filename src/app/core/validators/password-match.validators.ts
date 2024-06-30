import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ 'passwordsMismatch': true });
    return { 'passwordsMismatch': true };
  } else {
    return null;
  }
}  
};