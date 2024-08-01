import { inject } from '@angular/core';
import {
  Router,
  RedirectCommand,
  type Route,
  type CanMatchFn,
  type UrlSegment,
} from '@angular/router';

import { AuthService } from './auth.service';

export const authCanMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.user()) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/auth'));
};
