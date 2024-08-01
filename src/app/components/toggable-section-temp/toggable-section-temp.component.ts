import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-toggable-section-temp',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './toggable-section-temp.component.html',
  styleUrl: './toggable-section-temp.component.scss',
})
export class ToggableSectionTempComponent {
  @Input() title?: string;
}
