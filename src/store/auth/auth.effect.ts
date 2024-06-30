import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { authActions, authApiActions } from './auth.action';
import { catchError, filter, from, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addManager } from '../managers/managers.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Navigate } from 'src/app/core/enums/navigate-enums';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackbar = inject(MatSnackBar);

  loadUserState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.getUserState),
      switchMap(() => this.authService.getCurrentUser()),
      map((currentUser) => authApiActions.getUserStateSuccess({ currentUser })),
      catchError((error: string) => {
        console.log('error', error);
        return of(authApiActions.getUserStateFailure({ error }));
      })
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.registerUser),
      switchMap((action) =>
        from(
          this.authService.register(
            action.username,
            action.password,
            action.displayName
          )
        ).pipe(filter((user) => !!user))
      ),
      map((action) => {
        this.snackbar.open('success', 'dismiss');
        console.log(action);
        this.router.navigate([Navigate.LOGIN]);
        this.store.dispatch(authActions.getUserState());
        if (action)
          this.store.dispatch(
            addManager({
              manager: {
                username: action.displayName.username,
                firstname: action.displayName.firstname,
                lastname: action.displayName.lastname,
                dateRegistered: action.displayName.dateRegistered,
                totalSales: '0',
              },
            })
          );
        return authApiActions.registerUserSuccess();
      }),
      catchError((error: string) => {
        console.log('error', error);
        this.router.navigate([Navigate.REGISTER]);
        return of(authApiActions.registerUserFailure({ error }));
      })
    );
  });

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginUser),
      switchMap((action) =>
        this.authService.logIn(action.username, action.password)
      ),
      filter((action) => !!action),
      map(() => {
        this.snackbar.open('success', 'dismiss');
        this.router.navigate([Navigate.PRODUCT]);
        return authApiActions.loginUserSuccess();
      }),
      catchError((error: string) => {
        console.log('error', error);
        this.router.navigate([Navigate.LOGIN]);
        return of(authApiActions.loginUserFailure({ error }));
      })
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.logoutUser),
      switchMap(() => this.authService.logout()),
      filter((boolean) => !!boolean),
      map(() => {
        this.snackbar.open('success', 'dismiss');
        this.router.navigate([Navigate.LOGIN]);
        return authApiActions.logoutUserSuccess();
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(authApiActions.logoutUserFailure({ error }));
      })
    );
  });
}
