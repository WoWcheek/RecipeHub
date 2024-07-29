import { Injectable, signal } from '@angular/core';

import { type Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = signal<Ingredient[]>([
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ]);

  allIngredients = this.ingredients.asReadonly();

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.update((x) => [...x, newIngredient]);
  }
}
