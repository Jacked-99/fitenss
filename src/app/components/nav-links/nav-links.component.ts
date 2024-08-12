import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../shared/user.service';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
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
  constructor(
    private breakpoint: BreakpointObserver,
    private auth: UserService
  ) {}
  authSub!: Subscription;
  hideSideMenu = true;
  currentUser?: User;
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
    this.authSub = this.auth.$user.subscribe({
      next: (val) =>
        val ? (this.currentUser = val) : (this.currentUser = undefined),
    });
  }
  changeUserString(val: User | undefined) {
    if (val) {
      let string = val.email?.slice(0, val.email.indexOf('@'));
      return string;
    }
    return;
  }
  onLogoutClick() {
    this.auth.logoutUser();
  }
  ngOnDestroy(): void {
    this.breakpoint.ngOnDestroy();
    this.authSub.unsubscribe();
  }
}
