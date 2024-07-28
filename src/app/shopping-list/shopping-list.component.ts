import { Component, signal } from '@angular/core';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { type Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  imports: [ShoppingEditComponent],
})
export class ShoppingListComponent {
  ingredients = signal<Ingredient[]>([
    {
      name: 'Apples',
      amount: 5,
    },
    {
      name: 'Tomatoes',
      amount: 10,
    },
  ]);

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.update((x) => [...x, ingredient]);
  }
}
