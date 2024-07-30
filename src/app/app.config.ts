import {
  provideRouter,
  withRouterConfig,
  withComponentInputBinding,
} from '@angular/router';
import { type ApplicationConfig } from '@angular/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
  ],
};
