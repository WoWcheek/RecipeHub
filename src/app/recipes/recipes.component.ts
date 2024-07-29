import { Component, inject } from '@angular/core';

import { RecipesService } from './recipes.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { type Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RecipeListComponent, RecipeDetailComponent],
})
export class RecipesComponent {
  private recipesService = inject(RecipesService);
  selectedRecipe = this.recipesService.selectedRecipe;

  onRecipeWasSelected(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
  }
}
