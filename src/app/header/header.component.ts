import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  private dataStorageService = inject(DataStorageService);

  onSaveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }
}
