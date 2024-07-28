import { Component, signal } from '@angular/core';

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
  selectedRecipe = signal<Recipe | undefined>(undefined);

  onRecipeWasSelected(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
  }
}
