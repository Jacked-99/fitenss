import { Component } from '@angular/core';
import { NavLinksComponent } from '../nav-links/nav-links.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NavLinksComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
