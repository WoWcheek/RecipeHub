import { Injectable, signal } from '@angular/core';

import { type Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes = signal<Recipe[]>([
    {
      name: 'A Test Recipe',
      description: 'Simple test',
      imagePath:
        'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
    },
    {
      name: 'Second Recipe',
      description: 'Just a test',
      imagePath:
        'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
    },
  ]);
  selectedRecipe = signal<Recipe | undefined>(undefined);

  allRecipes = this.recipes.asReadonly();
}
