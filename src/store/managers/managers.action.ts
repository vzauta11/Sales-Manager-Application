import { createAction, createActionGroup, props } from '@ngrx/store';
import { Manager } from 'src/app/core/interfaces/manager.interfaces';

export const initManagers = createAction('[Load managers] Init');

export const initManagersApiActions = createActionGroup({
  source: 'Managers/Api',
  events: {
    'Load Managers Success': props<{
      managers: Manager[];
    }>(),
    'Load Managers Failure': props<{
      error: string;
    }>(),
  },
});

export const updateManager = createAction(
  '[Update] Manager',
  props<{ manager: Manager }>()
);

export const updateManagerApiActions = createActionGroup({
  source: 'Manager/Api',
  events: {
    'Update Managers Success': props<{
      manager: Manager;
    }>(),
    'Update Managers Failure': props<{
      error: string;
    }>(),
  },
});

export const addManager = createAction(
  '[Add] Manager',
  props<{ manager: Manager }>()
);

export const addManagerApiActions = createActionGroup({
  source: 'Manager/Api',
  events: {
    'Add Managers Success': props<{
      manager: Manager;
    }>(),
    'Add Managers Failure': props<{
      error: string;
    }>(),
  },
});
