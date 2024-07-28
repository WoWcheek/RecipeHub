import { Component, input } from '@angular/core';

import { DropdownDirective } from '../../shared/dropdown.directive';
import { type Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  imports: [DropdownDirective],
})
export class RecipeDetailComponent {
  selectedRecipe = input.required<Recipe>();
}
