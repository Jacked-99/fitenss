import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';
import { ProductBasePageComponent } from './components/product-base-page/product-base-page.component';

export const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'products', component: ProductBasePageComponent },
  { path: '**', component: ErrorPageComponent },
];
