import { type Routes } from '@angular/router';

import { authCanMatch } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes',
  },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./recipes/recipes.component').then((m) => m.RecipesComponent),
    canMatch: [authCanMatch],
    loadChildren: () =>
      import('./recipes/recipes.routes').then((m) => m.routes),
  },
  {
    path: 'shopping-list',
    loadComponent: () =>
      import('./shopping-list/shopping-list.component').then(
        (m) => m.ShoppingListComponent
      ),
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];
