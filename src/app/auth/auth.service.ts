import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

import { type User } from './user.model';
import { type AuthResponseData } from './auth-response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private API_KEY = 'AIzaSyB4wGaKf4hQbkIWnCtMt1iHrEfUA_54GaM';

  private router = inject(Router);
  private httpClient = inject(HttpClient);
  private autoLogoutTimer: any;

  user = signal<User | null>(null);

  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(`${this.AUTH_URL}:signUp?key=${this.API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errRes) => {
          let errorMessage = 'An unknown error occurred!';

          switch (errRes.error?.error?.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'User with this email already exists!';
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMessage = 'Password sign-up is disabled!';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage = 'Too many attempts. Try again later!';
              break;
          }

          return throwError(() => new Error(errorMessage));
        }),
        tap((res) => {
          this.setUserData(res);
          this.setAutoLogout(+res.expiresIn * 1000);
          this.saveUserDataToLocalStorage();
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `${this.AUTH_URL}:signInWithPassword?key=${this.API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errRes) => {
          let errorMessage = 'An unknown error occurred!';

          switch (errRes.error?.error?.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'There is no user with this email!';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'The password is invalid!';
              break;
            case 'USER_DISABLED':
              errorMessage =
                'The user account has been disabled by an administrator!';
              break;
          }

          return throwError(() => new Error(errorMessage));
        }),
        tap((res) => {
          this.setUserData(res);
          this.setAutoLogout(+res.expiresIn * 1000);
          this.saveUserDataToLocalStorage();
        })
      );
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');

    if (!userData) return;

    const user: User = JSON.parse(userData);

    user.tokenExpirationDate = new Date(user.tokenExpirationDate);

    if (user.token && user.tokenExpirationDate > new Date()) {
      const expiresIn =
        user.tokenExpirationDate.getTime() - new Date().getTime();
      this.user.set(user);
      this.setAutoLogout(expiresIn);
    }
  }

  private setUserData(response: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const newUser: User = {
      id: response.localId,
      email: response.email,
      token: response.idToken,
      tokenExpirationDate: expirationDate,
    };
    this.user.set(newUser);
  }

  private saveUserDataToLocalStorage() {
    const userData = JSON.stringify(this.user());
    localStorage.setItem('userData', userData);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.router.navigate(['/auth']);
  }

  setAutoLogout(logoutInMilliseconds: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, logoutInMilliseconds);
  }
}
