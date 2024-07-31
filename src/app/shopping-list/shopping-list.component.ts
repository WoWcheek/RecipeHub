import { Component, inject, signal } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
  imports: [ShoppingEditComponent],
})
export class ShoppingListComponent {
  private shoppingListService = inject(ShoppingListService);
  ingredients = this.shoppingListService.allIngredients;

  selectedItemIndex = signal<number | undefined>(undefined);

  onItemReset() {
    this.selectedItemIndex.set(undefined);
  }

  onItemSelected(index: number) {
    if (this.selectedItemIndex() === index) {
      this.selectedItemIndex.set(undefined);
    } else {
      this.selectedItemIndex.set(index);
    }
  }
}
