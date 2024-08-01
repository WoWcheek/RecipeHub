import { inject } from '@angular/core';
import {
  HttpParams,
  type HttpRequest,
  type HttpHandlerFn,
  type HttpInterceptorFn,
} from '@angular/common/http';

import { AuthService } from './auth.service';

export const addUserToken: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  if (!authService.user()) {
    return next(request);
  }

  const modifiedRequest = request.clone({
    params: new HttpParams().set('auth', authService.user()?.token!),
  });

  return next(modifiedRequest);
};
