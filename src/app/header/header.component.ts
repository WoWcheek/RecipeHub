import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [],
})
export class HeaderComponent {
  featureSelected = output<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
