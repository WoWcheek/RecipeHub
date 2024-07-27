import { Component, signal } from '@angular/core';

import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { type Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  imports: [RecipeItemComponent],
})
export class RecipeListComponent {
  recipes = signal<Recipe[]>([
    {
      name: 'A Test Recipe',
      description: 'Simple test',
      imagePath:
        'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg',
    },
  ]);
}
