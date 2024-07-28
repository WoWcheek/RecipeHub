import { Component, input } from '@angular/core';

import { type Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  selectedRecipe = input.required<Recipe>();
}
