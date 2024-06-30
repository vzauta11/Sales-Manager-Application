import { createReducer, on } from '@ngrx/store';
import {
  addManagerApiActions,
  initManagersApiActions,
  updateManagerApiActions,
} from './managers.action';
import { Manager } from 'src/app/core/interfaces/manager.interfaces';

export const MANAGERS_FEATURE_KEY = 'managersPage';

export interface ManagersPageState {
  managers: Manager[];
}

export const initialManagersPageState: ManagersPageState = { managers: [] };

export const managersPageReducer = createReducer(
  initialManagersPageState,
  on(
    initManagersApiActions.loadManagersFailure,
    updateManagerApiActions.updateManagersFailure,
    addManagerApiActions.addManagersFailure,
    (state, action): ManagersPageState => {
      return {
        ...state,
      };
    }
  ),
  on(
    initManagersApiActions.loadManagersSuccess,
    (state, action): ManagersPageState => {
      return {
        ...state,
        managers: action.managers,
      };
    }
  ),
  on(
    updateManagerApiActions.updateManagersSuccess,
    (state, action): ManagersPageState => {
      const newManagersState = state.managers.map((el) =>
        el.id === action.manager.id ? action.manager : el
      );
      return {
        ...state,
        managers: newManagersState,
      };
    }
  ),
  on(
    addManagerApiActions.addManagersSuccess,
    (state, action): ManagersPageState => {
      return {
        ...state,
        managers: [...state.managers, action.manager],
      };
    }
  )
);
