import { Component, inject, signal, type OnInit } from '@angular/core';
import { ActivatedRoute, Router, type Params } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { type Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  imports: [DropdownDirective],
})
export class RecipeDetailComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private recipesService = inject(RecipesService);
  private shoppingListService = inject(ShoppingListService);

  selectedRecipe = signal<Recipe | undefined>(undefined);

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: Params) =>
        this.selectedRecipe.set(
          this.recipesService.getRecipeByIndex(+params['id'])
        ),
    });
  }

  onAddIngredientsToShoppingList() {
    this.shoppingListService.addRangeIngredients(
      this.selectedRecipe()?.ingredients || []
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }
}
