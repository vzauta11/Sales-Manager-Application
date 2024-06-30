import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { authActions } from 'src/store/auth/auth.action';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegisterInAuthForm } from 'src/app/core/interfaces/register.interfaces';
import { CurrentUser } from 'src/app/core/interfaces/user.interfaces';
import { passwordMatchValidator } from 'src/app/core/validators/password-match.validators';
import { passwordValidator } from 'src/app/core/validators/password.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly store = inject(Store);
  hide: boolean = true;

  readonly registerForm = new FormGroup<RegisterInAuthForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    firstname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, passwordValidator()],
    }),
    confirmPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  },
  { validators: passwordMatchValidator() }
);

  get usernameControl(): AbstractControl {
    return this.registerForm.controls['username'];
  }
  get firstnameControl(): AbstractControl {
    return this.registerForm.controls['firstname'];
  }
  get lastnameControl(): AbstractControl {
    return this.registerForm.controls['lastname'];
  }
  get passwordControl(): AbstractControl {
    return this.registerForm.controls['password'];
  }
  get confirmPasswordControl(): AbstractControl {
    return this.registerForm.controls['confirmPassword'];
  }

  submit() {
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;
    const displayName: CurrentUser = {
      firstname: this.registerForm.value.firstname!,
      lastname: this.registerForm.value.lastname!,
      username: this.registerForm.value.username!,
      dateRegistered: new Date().toISOString(),
    };
    if (username && password && displayName)
      this.store.dispatch(
        authActions.registerUser({ username, password, displayName })
      );
  }

  protected togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
