import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { RecipesService } from '../recipes/recipes.service';
import { type Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private API_URL = 'https://recipe-hub-97cd2-default-rtdb.firebaseio.com';

  private httpClient = inject(HttpClient);
  private recipesService = inject(RecipesService);

  fetchRecipes() {
    this.httpClient
      .get<Recipe[]>(`${this.API_URL}/recipes.json`)
      .pipe(
        map((recipes) =>
          recipes.map((recipe) =>
            recipe.ingredients ? recipe : { ...recipe, ingredients: [] }
          )
        )
      )
      .subscribe({
        next: (res) => {
          this.recipesService.setRecipes(res);
        },
      });
  }

  saveRecipes() {
    const recipes = this.recipesService.allRecipes();
    this.httpClient
      .put<Recipe[]>(`${this.API_URL}/recipes.json`, recipes)
      .subscribe({
        next: (res) => {
          this.recipesService.setRecipes(res);
        },
      });
  }
}
