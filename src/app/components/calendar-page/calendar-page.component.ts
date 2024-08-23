import { Component, OnInit, signal } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { CalendarDisplayComponent } from '../calendar-display/calendar-display.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatabaseIntakeService } from '../../shared/database-intake.service';
import { Intake } from '../../shared/intake';
import { retry } from 'rxjs';
import { MatDivider } from '@angular/material/divider';

export interface dateCalArray {
  date: string;
  calories: number;
}
@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    ContentPageTempComponent,
    CalendarDisplayComponent,
    MatIcon,
    MatIconButton,
    TitleCasePipe,
    MatDivider,
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
  itemsArrray!: dateCalArray[];

  mobileCalorieValue = signal({ visible: false, value: 0 });

  constructor(
    private breakpoint: BreakpointObserver,
    private db: DatabaseIntakeService
  ) {}

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
    this.filterMonthly(this.itemsArrray);
    this.dateVal = newDate;
    this.monthString = this.dateVal.toLocaleString('default', {
      month: 'long',
    });
  }
  ngOnInit(): void {
    this.breakpoint.observe([Breakpoints.HandsetPortrait]).subscribe({
      next: (result) =>
        result.matches ? (this.isMobile = true) : (this.isMobile = false),
    });
    this.db.getMonthlyData()?.then((value) => {
      this.itemsArrray = this.transformObject(value.val());
      this.filterMonthly(this.itemsArrray);
    });
  }
  transformObject(object: { string: Intake[] }) {
    let transformedArray = [];
    let keys: keyof typeof object;
    for (keys in object) {
      let newObj: dateCalArray = { date: '', calories: 0 };
      let key = keys;

      newObj.date = key;
      newObj.calories = object[keys].reduce(
        (acc, val) => acc + val.calories,
        0
      );

      transformedArray.push(newObj);
    }
    return transformedArray;
  }
  filterMonthly(values: dateCalArray[]) {
    return values.filter((value) => {
      let month = value.date.slice(2, 4);
      if (Number(month) == this.monthVal) {
        return true;
      } else {
        return false;
      }
    });
  }
  setDateCalories($event: number) {
    this.mobileCalorieValue.set({ value: $event, visible: true });
  }
}
