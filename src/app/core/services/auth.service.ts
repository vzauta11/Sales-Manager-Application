import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { CurrentUser } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private displayname?: CurrentUser;
  private currentUser?: CurrentUser;

  constructor(private fireAuth: AngularFireAuth) {}

  logIn(username: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(`${username}@email.com`, password)
      .then(
        (result) => {
          const user = result.user;
          if (user && user.displayName) {
            this.displayname = JSON.parse(user.displayName);
          }
          return result;
        },
        (err) => {
          alert('Something went wrong');
          console.log(err);
        }
      );
  }

  register(username: string, password: string, displayName: CurrentUser) {
    return this.fireAuth
      .createUserWithEmailAndPassword(`${username}@email.com`, password)
      .then(
        (result) => {
          return result.user
            ?.updateProfile({
              displayName: JSON.stringify({ displayName }),
            })
            .then(() => {
              alert('Registration Successful');
              if (result.user?.displayName)
                return JSON.parse(result.user.displayName);
            })
            .catch((err) => {
              alert('Something went wrong');
              console.log(err);
            });
        },
        (err) => {
          alert('Something went wrong');
          console.log(err);
        }
      );
  }

  logout() {
    return this.fireAuth.signOut().then(
      () => {
        this.displayname = undefined;
        return true;
      },
      (err) => {
        alert('Something went wrong');
        console.log(err);
      }
    );
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.fireAuth.authState.pipe(
      map((user) => {
        if (user && user.displayName) {
          return JSON.parse(user.displayName)['displayName'];
        }
      })
    );
  }
}
