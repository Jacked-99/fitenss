import { Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';
import { ProductBasePageComponent } from './components/product-base-page/product-base-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { ProductDetialsPageComponent } from './components/product-detials-page/product-detials-page.component';

export const routes: Routes = [
  { path: '', component: DashboardPageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  {
    path: 'products',
    component: ProductBasePageComponent,
  },
  { path: 'products/:id', component: ProductDetialsPageComponent },

  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '**', component: ErrorPageComponent },
];
