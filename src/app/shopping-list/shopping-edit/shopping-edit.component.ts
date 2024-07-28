import { Component, output, viewChild, type ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { type Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
  imports: [FormsModule],
})
export class ShoppingEditComponent {
  nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');
  amountInput = viewChild.required<ElementRef<HTMLInputElement>>('amountInput');

  ingredientAdded = output<Ingredient>();

  onAdd() {
    const newIngredient: Ingredient = {
      name: this.nameInput().nativeElement.value,
      amount: +this.amountInput().nativeElement.value,
    };
    this.ingredientAdded.emit(newIngredient);
  }
}
