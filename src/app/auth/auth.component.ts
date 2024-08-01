import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormsModule, type NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { type Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { type AuthResponseData } from './auth-response-data.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  imports: [FormsModule, SpinnerComponent, AlertComponent],
})
export class AuthComponent {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  isLoading = signal(false);
  isLoginMode = signal(true);
  error = signal<string | null>(null);

  onToggleLoginMode() {
    this.isLoginMode.update((x) => !x);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading.set(true);

    const { email, password } = form.value;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode()) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    const subscription = authObs.subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    form.reset();
  }

  resetError() {
    this.error.set(null);
  }
}
