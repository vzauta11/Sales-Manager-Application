import { createReducer, on } from '@ngrx/store';
import { authApiActions } from './auth.action';
import { CurrentUser } from 'src/app/core/interfaces/user.interfaces';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  currentUser: CurrentUser | null;
}

export const initialAuthState: AuthState = { currentUser: null };

export const authReducer = createReducer(
  initialAuthState,
  on(
    authApiActions.getUserStateFailure,
    authApiActions.registerUserFailure,
    authApiActions.loginUserFailure,
    authApiActions.logoutUserFailure,
    (state, action): AuthState => {
      return {
        ...state,
      };
    }
  ),
  on(
    authApiActions.registerUserSuccess,
    authApiActions.loginUserSuccess,
    (state, action): AuthState => {
      return {
        ...state,
      };
    }
  ),
  on(authApiActions.getUserStateSuccess, (state, action): AuthState => {
    return {
      ...state,
      currentUser: action.currentUser ? action.currentUser : null,
    };
  }),
  on(authApiActions.logoutUserSuccess, (state, action): AuthState => {
    return {
      ...state,
      currentUser: null,
    };
  })
);
