import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthState, selectCurrentUser } from './auth.selector';
import { concatLatestFrom } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { authActions } from './auth.action';

@Injectable()
export class AuthStateFacade {
  private readonly store = inject(Store);

  private readonly authState$ = this.store.select(selectCurrentUser).pipe(
    concatLatestFrom(() => this.store.select(selectAuthState)),
    tap(([, state]) => {
      if (!state.currentUser) this.store.dispatch(authActions.getUserState());
    }),
    map(([currentUser]) => currentUser)
  );

  getCurrentUser() {
    return this.authState$;
  }
}
