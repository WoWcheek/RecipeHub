import {
  inject,
  signal,
  computed,
  Component,
  DestroyRef,
  type OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, type Params } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  imports: [DropdownDirective],
})
export class RecipeDetailComponent implements OnInit {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private recipesService = inject(RecipesService);
  private shoppingListService = inject(ShoppingListService);

  selectedRecipeId = signal<number | undefined>(undefined);
  selectedRecipe = computed(() =>
    this.selectedRecipeId() !== undefined
      ? this.recipesService.getRecipeByIndex(this.selectedRecipeId()!)
      : undefined
  );

  ngOnInit() {
    const subscription = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        const id = params['id'];
        this.selectedRecipeId.set(id !== undefined ? +id : id);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddIngredientsToShoppingList() {
    this.shoppingListService.addRangeIngredients(
      this.selectedRecipe()?.ingredients || []
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.selectedRecipeId()!);
    this.router.navigate(['/recipes']);
  }
}
