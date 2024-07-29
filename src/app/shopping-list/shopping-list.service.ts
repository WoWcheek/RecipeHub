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

  addRangeIngredients(newIngredients: Ingredient[]) {
    const updatedShoppingList = this.allIngredients();

    newIngredients.forEach((ingredient) => {
      const commonIngredient = this.allIngredients().find(
        (x) => x.name.toLowerCase() === ingredient.name.toLowerCase()
      );

      if (commonIngredient) {
        commonIngredient.amount += ingredient.amount;
      } else {
        updatedShoppingList.push(ingredient);
      }
    });

    this.ingredients.set(updatedShoppingList);
  }
}
