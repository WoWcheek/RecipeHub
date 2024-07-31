import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  imports: [RecipeItemComponent],
})
export class RecipeListComponent {
  private router = inject(Router);
  private recipesService = inject(RecipesService);
  private activatedRoute = inject(ActivatedRoute);

  recipes = this.recipesService.allRecipes;

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
