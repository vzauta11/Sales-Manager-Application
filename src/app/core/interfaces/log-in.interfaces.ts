import { FormControl } from "@angular/forms";

export interface LoginInAuthForm {
    username: FormControl<string>;
    password: FormControl<string>;
}