import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addManager,
  addManagerApiActions,
  initManagers,
  initManagersApiActions,
  updateManager,
  updateManagerApiActions,
} from './managers.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { ManagersService } from 'src/app/core/services/managers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ManagersPageEffect {
  private readonly actions$ = inject(Actions);
  private readonly managersService = inject(ManagersService);
  private readonly snackbar = inject(MatSnackBar);

  loadManagers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initManagers),
      switchMap(() => this.managersService.getManagers()),
      map((managers) =>
        initManagersApiActions.loadManagersSuccess({
          managers,
        })
      ),
      catchError((error: string) => {
        console.log('error', error);
        return of(initManagersApiActions.loadManagersFailure({ error }));
      })
    );
  });

  updateManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateManager),
      switchMap((action) => this.managersService.updateManager(action.manager)),
      map((manager) => {
        this.snackbar.open('success', 'dismiss');
        return updateManagerApiActions.updateManagersSuccess({
          manager,
        });
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(updateManagerApiActions.updateManagersFailure({ error }));
      })
    );
  });

  addManager$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addManager),
      switchMap((action) => this.managersService.addManager(action.manager)),
      map((manager) => {
        this.snackbar.open('success', 'dismiss');
        return addManagerApiActions.addManagersSuccess({
          manager,
        });
      }),
      catchError((error: string) => {
        console.log('error', error);
        return of(addManagerApiActions.addManagersFailure({ error }));
      })
    );
  });
}
