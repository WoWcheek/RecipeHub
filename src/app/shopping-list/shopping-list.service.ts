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

  getIngredientByIndex(index: number) {
    return this.allIngredients()[index];
  }

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

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients.update((x) => {
      const ingredientsCopy = [...x];
      ingredientsCopy[index] = updatedIngredient;
      return ingredientsCopy;
    });
  }

  deleteIngredient(index: number) {
    console.log(index);
    this.ingredients.update((x) => x.filter((_, i) => i !== index));
  }
}
