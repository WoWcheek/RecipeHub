import {
  Component,
  computed,
  inject,
  signal,
  type OnInit,
} from '@angular/core';
import { ActivatedRoute, type Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  id = signal<number | undefined>(undefined);
  isEditingMode = computed(() => !!this.id());

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id.set(+params['id']);
      },
    });
  }
}
