import { Component, inject } from '@angular/core';

import { RecipesService } from '../recipes.service';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  imports: [DropdownDirective],
})
export class RecipeDetailComponent {
  private recipesService = inject(RecipesService);
  selectedRecipe = this.recipesService.selectedRecipe;
}
