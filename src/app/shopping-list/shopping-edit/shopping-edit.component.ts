import {
  input,
  inject,
  output,
  effect,
  computed,
  viewChild,
  Component,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

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
  form = viewChild.required<NgForm>('form');
  private shoppingListService = inject(ShoppingListService);

  formReset = output();

  shoppingListItemIndex = input.required<number | undefined>();
  isEditingMode = computed(() => this.shoppingListItemIndex() !== undefined);
  shoppingListItem = computed(() => {
    if (this.shoppingListItemIndex() === undefined) return undefined;
    return this.shoppingListService.getIngredientByIndex(
      this.shoppingListItemIndex()!
    );
  });

  constructor() {
    effect(() => {
      if (this.shoppingListItemIndex() === undefined) {
        this.form().reset();
      } else {
        this.form().setValue({
          name: this.shoppingListItem()!.name,
          amount: this.shoppingListItem()!.amount,
        });
      }
    });
  }

  onAdd(form: NgForm) {
    const newIngredient: Ingredient = {
      name: form.value.name,
      amount: +form.value.amount,
    };

    this.shoppingListService.addIngredient(newIngredient);

    this.formReset.emit();
    this.form().reset();
  }

  onUpdate(form: NgForm) {
    const updatedIngredient: Ingredient = {
      name: form.value.name,
      amount: +form.value.amount,
    };

    this.shoppingListService.updateIngredient(
      this.shoppingListItemIndex()!,
      updatedIngredient
    );

    this.formReset.emit();
  }

  onDelete() {
    if (this.isEditingMode()) {
      this.shoppingListService.deleteIngredient(this.shoppingListItemIndex()!);
      this.formReset.emit();
    }
  }
}
