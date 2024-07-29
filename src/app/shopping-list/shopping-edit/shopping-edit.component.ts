import { Component, inject, viewChild, type ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { type Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
  imports: [FormsModule],
})
export class ShoppingEditComponent {
  private shoppingListService = inject(ShoppingListService);
  nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');
  amountInput = viewChild.required<ElementRef<HTMLInputElement>>('amountInput');

  onAdd() {
    const newIngredient: Ingredient = {
      name: this.nameInput().nativeElement.value,
      amount: +this.amountInput().nativeElement.value,
    };

    this.shoppingListService.addIngredient(newIngredient);
  }
}
