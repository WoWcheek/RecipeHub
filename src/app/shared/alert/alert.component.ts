import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  message = input.required<string>();
  close = output();

  onClose() {
    this.close.emit();
  }
}
