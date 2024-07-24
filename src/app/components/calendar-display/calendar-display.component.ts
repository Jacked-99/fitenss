import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-display',
  standalone: true,
  imports: [NgClass],
  templateUrl: './calendar-display.component.html',
  styleUrl: './calendar-display.component.scss',
})
export class CalendarDisplayComponent {
  @Input() newDate: Date = new Date();
  numOfDays = this.newDate.getDate();
  today = new Date().getDate();

  upadteArr(): number[] {
    this.numOfDays = this.newDate.getDate();
    return Array(this.numOfDays)
      .fill(0)
      .map((val, index) => index + 1);
  }
  checkToday() {
    let todayDate = new Date();
    if (
      todayDate.getFullYear() == this.newDate.getFullYear() &&
      todayDate.getMonth() == this.newDate.getMonth() + 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
