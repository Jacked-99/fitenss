import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-display',
  standalone: true,
  imports: [],
  templateUrl: './calendar-display.component.html',
  styleUrl: './calendar-display.component.scss',
})
export class CalendarDisplayComponent {
  @Input() numOfDays = 0;

  upadteArr(): number[] {
    return Array(this.numOfDays)
      .fill(0)
      .map((val, index) => index + 1);
  }
}
