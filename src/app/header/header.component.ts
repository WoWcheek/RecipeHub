import { Component, output } from '@angular/core';

import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [DropdownDirective],
})
export class HeaderComponent {
  featureSelected = output<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
