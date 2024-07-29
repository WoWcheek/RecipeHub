import { Component, inject } from '@angular/core';

import { RecipesService } from '../recipes.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  imports: [RecipeItemComponent],
})
export class RecipeListComponent {
  private recipesService = inject(RecipesService);

  recipes = this.recipesService.allRecipes();
}
