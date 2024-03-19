import { Component } from '@angular/core';
import { AuthPageTempComponent } from '../auth-page-temp/auth-page-temp.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [AuthPageTempComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {}
