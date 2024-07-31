import {
  inject,
  signal,
  computed,
  Component,
  DestroyRef,
  type OnInit,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, type Params } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { type Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
  imports: [ReactiveFormsModule],
})
export class RecipeEditComponent implements OnInit {
  private router = inject(Router);
  destroyRef = inject(DestroyRef);
  private recipesService = inject(RecipesService);
  private activatedRoute = inject(ActivatedRoute);

  id = signal<number | undefined>(undefined);
  isEditingMode = computed(() => this.id() !== undefined);

  form!: FormGroup;

  ngOnInit() {
    const subscription = this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        const id: string | undefined = params['id'];
        this.id.set(id !== undefined ? +id : id);
        this.initForm();
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private initForm() {
    const recipe = this.isEditingMode()
      ? this.recipesService.getRecipeByIndex(this.id()!)
      : undefined;

    let initialName = recipe?.name || null;
    let initialImagePath = recipe?.imagePath || null;
    let initialDescription = recipe?.description || null;
    let initialIngredients = new FormArray<FormGroup>([]);

    if (recipe?.ingredients) {
      for (const ingredient of recipe.ingredients) {
        initialIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, [Validators.required]),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/[1-9]+[0-9]*$/),
            ]),
          })
        );
      }
    }

    this.form = new FormGroup({
      name: new FormControl(initialName, [Validators.required]),
      imagePath: new FormControl(initialImagePath, [Validators.required]),
      description: new FormControl(initialDescription, [Validators.required]),
      ingredients: initialIngredients,
    });
  }

  get ingredientsControls() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).controls.push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    const newRecipe: Recipe = {
      name: this.form.value['name'],
      imagePath: this.form.value['imagePath'],
      description: this.form.value['description'],
      ingredients: (
        this.form.controls['ingredients'] as FormArray
      ).controls.map((x) => {
        return {
          name: x.value.name,
          amount: x.value.amount,
        };
      }),
    };

    if (this.isEditingMode()) {
      this.recipesService.updateRecipe(this.id()!, newRecipe);
    } else {
      this.recipesService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
