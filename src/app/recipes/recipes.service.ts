import { Injectable, signal } from '@angular/core';

import { type Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes = signal<Recipe[]>([]);

  allRecipes = this.recipes.asReadonly();

  getRecipeByIndex(index: number) {
    return this.allRecipes()[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes.set(recipes);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.update((x) => [...x, recipe]);
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes.update((x) => {
      const recipesCopy = [...x];
      recipesCopy[index] = updatedRecipe;
      return recipesCopy;
    });
  }

  deleteRecipe(index: number) {
    this.recipes.update((x) => x.filter((_, i) => i !== index));
  }
}
