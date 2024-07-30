import { Injectable, signal } from '@angular/core';

import { type Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes = signal<Recipe[]>([
    {
      name: 'Tasty Schnitzel',
      description: 'A super tasty schnitzel - just awesome!',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/330px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
      ingredients: [
        { name: 'Meat', amount: 1 },
        { name: 'French Fries', amount: 20 },
      ],
    },
    {
      name: 'Big Fat Burger',
      description: 'Loved by everyone!',
      imagePath:
        'https://images.immediate.co.uk/production/volatile/sites/2/2015/08/12817.jpg?quality=90&webp=true&crop=2px,129px,596px,542px&resize=600,545',
      ingredients: [
        { name: 'Buns', amount: 2 },
        { name: 'Meat', amount: 1 },
      ],
    },
  ]);

  allRecipes = this.recipes.asReadonly();

  getRecipeByIndex(index: number) {
    return this.allRecipes()[index];
  }
}
