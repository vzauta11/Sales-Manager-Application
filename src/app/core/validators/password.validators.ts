import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null; // return if empty
      }
  
      const hasMinLength = value.length >= 8;
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
      const passwordValid = hasMinLength && hasSymbol;
  
      return !passwordValid ? { passwordStrength: true } : null;
    };
  }