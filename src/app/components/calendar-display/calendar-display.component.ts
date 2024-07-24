import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-calendar-display',
  standalone: true,
  imports: [NgClass],
  templateUrl: './calendar-display.component.html',
  styleUrl: './calendar-display.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query('.grid-element', [
          style({ opacity: 0, transform: 'none' }),
          stagger(30, [
            animate(
              '500ms  cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            ),
          ]),
        ]),
      ]),
      transition('hidden => visible', [animate('0.1s')]),
    ]),
  ],
})
export class CalendarDisplayComponent {
  @Input() newDate: Date = new Date();
  numOfDays = 0;
  today = new Date().getDate();
  month = this.newDate.getMonth() + 1;

  upadteArr(): number[] {
    this.numOfDays = this.newDate.getDate();
    return Array(this.numOfDays)
      .fill(0)
      .map((val, index) => index + 1);
  }
  checkToday() {
    let todayDate = new Date();
    this.month = todayDate.getMonth() + 1;
    if (
      todayDate.getFullYear() == this.newDate.getFullYear() &&
      todayDate.getMonth() + 1 == this.newDate.getMonth() + 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
