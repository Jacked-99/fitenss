import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { CalendarDisplayComponent } from '../calendar-display/calendar-display.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    ContentPageTempComponent,
    CalendarDisplayComponent,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
})
export class CalendarPageComponent {
  dateVal = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  monthVal = this.dateVal.getMonth() + 1;
  yearVal = this.dateVal.getFullYear();
  monthString = this.dateVal.toLocaleString('defaul', { month: 'long' });
  today = new Date().getDate();

  changeMonth(number = 1) {
    let newMonth = (this.monthVal += number);
    if (this.monthVal > 12) {
      newMonth = 1;
      this.yearVal += 1;
    }
    const newDate = new Date(this.yearVal, newMonth, 0);
    this.monthVal = newMonth;

    this.dateVal = newDate;
    this.monthString = this.dateVal.toLocaleString('defaul', { month: 'long' });
  }
}
