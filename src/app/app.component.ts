import { Component, inject, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.autoLogin();
  }
}
