import { Component, inject, input } from '@angular/core';

import { RecipesService } from '../../recipes.service';
import { type Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  private recipesService = inject(RecipesService);
  recipe = input.required<Recipe>();

  onClick() {
    this.recipesService.selectedRecipe.set(this.recipe());
  }
}
