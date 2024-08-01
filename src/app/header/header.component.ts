import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../auth/auth.service';
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
  private authService = inject(AuthService);
  private dataStorageService = inject(DataStorageService);

  isAuthenticated = computed(() => !!this.authService.user());

  onSaveRecipes() {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
