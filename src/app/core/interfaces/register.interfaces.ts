import { FormControl } from "@angular/forms";

export interface RegisterInAuthForm {
    username: FormControl<string>;
    firstname: FormControl<string>;
    lastname: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }