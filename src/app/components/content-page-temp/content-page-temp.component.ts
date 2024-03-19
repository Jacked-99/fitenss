import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NavLinksComponent } from '../nav-links/nav-links.component';

@Component({
  selector: 'app-content-page-temp',
  standalone: true,
  imports: [MatCardModule, NavLinksComponent],
  templateUrl: './content-page-temp.component.html',
  styleUrl: './content-page-temp.component.scss',
})
export class ContentPageTempComponent {}
