import {
  provideRouter,
  withPreloading,
  withRouterConfig,
  PreloadAllModules,
  withComponentInputBinding,
} from '@angular/router';
import { type ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { addUserToken } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(withInterceptors([addUserToken])),
  ],
};
