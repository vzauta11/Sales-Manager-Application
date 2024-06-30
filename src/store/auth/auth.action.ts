import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUser } from 'src/app/core/interfaces/user.interfaces';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get User State': emptyProps(),
    'Register User': props<{
      username: string;
      password: string;
      displayName: CurrentUser;
    }>(),
    'Login User': props<{
      username: string;
      password: string;
    }>(),
    'Logout User': emptyProps(),
  },
});

export const authApiActions = createActionGroup({
  source: 'Auth/Api',
  events: {
    'Get User State Success': props<{
      currentUser: CurrentUser;
    }>(),
    'Get User State Failure': props<{
      error: string;
    }>(),
    'Register User Success': emptyProps(),
    'Register User Failure': props<{
      error: string;
    }>(),
    'Login User Success': emptyProps(),
    'Login User Failure': props<{
      error: string;
    }>(),
    'Logout User Success': emptyProps(),
    'Logout User Failure': props<{
      error: string;
    }>(),
  },
});
