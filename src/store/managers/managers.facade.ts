import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectManagers, selectManagersPageState } from './managers.selector';
import { concatLatestFrom } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { initManagers } from './managers.action';

@Injectable()
export class ManagersFacade {
  private readonly store = inject(Store);

  private readonly managers$ = this.store.select(selectManagers).pipe(
    concatLatestFrom(() => this.store.select(selectManagersPageState)),
    tap(([, state]) => {
      if (state.managers.length < 1) this.store.dispatch(initManagers());
    }),
    map(([managers]) => managers)
  );

  getManagers() {
    return this.managers$;
  }
}
