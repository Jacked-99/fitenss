import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  state,
} from '@angular/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calendar-display',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
  ],
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
      transition('hidden => visible', [animate('0.5s')]),
    ]),
  ],
})
export class CalendarDisplayComponent implements OnInit {
  @Input() newDate: Date = new Date();
  @Input() monthName = '';

  isMobile = false;
  numOfDays = 0;
  today = new Date().getDate();
  month = this.newDate.getMonth() + 1;
  constructor(private breakpoint: BreakpointObserver) {}
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
      todayDate.getMonth() + 1 == this.newDate.getMonth() + 1
    ) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit(): void {
    this.breakpoint
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) =>
        result.matches ? (this.isMobile = true) : (this.isMobile = false)
      );
  }
}
