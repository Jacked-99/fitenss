import { Component, OnInit } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { CalendarDisplayComponent } from '../calendar-display/calendar-display.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    ContentPageTempComponent,
    CalendarDisplayComponent,
    MatIcon,
    MatIconButton,
    TitleCasePipe,
  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
})
export class CalendarPageComponent implements OnInit {
  dateVal = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  monthVal = this.dateVal.getMonth() + 1;
  yearVal = this.dateVal.getFullYear();
  monthString = this.dateVal.toLocaleString('default', { month: 'long' });
  currentDate = new Date();
  today = this.currentDate.getDate();
  isMobile = false;

  constructor(private breakpoint: BreakpointObserver) {}

  changeMonth(number = 1) {
    let newMonth = (this.monthVal += number);
    if (this.monthVal > 12) {
      newMonth = 1;
      this.yearVal += 1;
    } else if (this.monthVal < 1) {
      newMonth = 12;
      this.yearVal -= 1;
    }
    const newDate = new Date(this.yearVal, newMonth, 0);
    this.monthVal = newMonth;

    this.dateVal = newDate;
    this.monthString = this.dateVal.toLocaleString('default', {
      month: 'long',
    });
  }
  ngOnInit(): void {
    this.breakpoint
      .observe([Breakpoints.HandsetPortrait])
      .subscribe({
        next: (result) =>
          result.matches ? (this.isMobile = true) : (this.isMobile = false),
      });
  }
}
