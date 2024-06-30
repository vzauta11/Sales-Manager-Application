import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
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
import { LoginInAuthForm } from 'src/app/core/interfaces/log-in.interfaces';
import { passwordValidator } from 'src/app/core/validators/password.validators';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  private readonly store = inject(Store);
  hide: boolean = true;

  readonly loginForm = new FormGroup<LoginInAuthForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  
  get usernameControl(): AbstractControl {
    return this.loginForm.controls['username'];
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.controls['password'];
  }

  submit(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (username && password)
      this.store.dispatch(authActions.loginUser({ username, password }));
  }

  protected togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
