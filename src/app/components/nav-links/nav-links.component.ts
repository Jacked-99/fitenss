import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
})
export class NavLinksComponent implements OnInit, OnDestroy {
  constructor(private breakpoint: BreakpointObserver) {}
  hideSideMenu = true;
  ngOnInit(): void {
    this.breakpoint
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        if (result.matches) {
          this.hideSideMenu = false;
        } else {
          this.hideSideMenu = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.breakpoint.ngOnDestroy();
  }
}
