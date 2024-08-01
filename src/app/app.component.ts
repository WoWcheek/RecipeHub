import { Component, inject, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DataStorageService } from './shared/data-storage.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private dataStorageService = inject(DataStorageService);

  ngOnInit() {
    this.dataStorageService.fetchRecipes();
  }
}
