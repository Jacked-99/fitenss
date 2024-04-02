import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ContentPageTempComponent, MatDivider],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
