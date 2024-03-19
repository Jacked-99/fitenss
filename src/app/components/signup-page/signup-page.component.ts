import { Component } from '@angular/core';
import { AuthPageTempComponent } from '../auth-page-temp/auth-page-temp.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [AuthPageTempComponent, MatIconModule, MatButtonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {}
