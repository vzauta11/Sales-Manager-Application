import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MANAGERS_FEATURE_KEY, ManagersPageState } from './managers.reducer';

export const selectManagersPageState =
  createFeatureSelector<ManagersPageState>(MANAGERS_FEATURE_KEY);

export const selectManagers = createSelector(
  selectManagersPageState,
  (state) => state.managers
);
