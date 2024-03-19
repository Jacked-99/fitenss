import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [ContentPageTempComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
})
export class CalendarPageComponent {}
