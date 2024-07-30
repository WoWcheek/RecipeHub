import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  imports: [RouterOutlet, RecipeListComponent],
})
export class RecipesComponent {}
