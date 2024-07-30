import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class RecipeItemComponent {
  private recipesService = inject(RecipesService);
  index = input.required<number>();
  recipe = computed(() => this.recipesService.getRecipeByIndex(this.index()));
}
