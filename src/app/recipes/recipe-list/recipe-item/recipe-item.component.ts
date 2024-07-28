import { Component, input, output } from '@angular/core';

import { type Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  recipe = input.required<Recipe>();
  recipeSelected = output();

  onClick() {
    this.recipeSelected.emit();
  }
}
