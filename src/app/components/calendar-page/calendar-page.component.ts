import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { CalendarDisplayComponent } from '../calendar-display/calendar-display.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [ContentPageTempComponent, CalendarDisplayComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
})
export class CalendarPageComponent {
  dateVal = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
  monthVal = this.dateVal.getMonth() + 1;
  yearVal = this.dateVal.getFullYear();

  today = new Date().getDate();

  addMonth() {
    let newMonth = (this.monthVal += 1);
    if (this.monthVal > 12) {
      newMonth = 1;
      this.yearVal += 1;
    }
    const newDate = new Date(this.yearVal, newMonth, 0);
    // this.monthVal = newMonth;
    // this.days = newDate.getDate();
    this.dateVal = newDate;

    console.log(this.dateVal.getDate());
  }
}
