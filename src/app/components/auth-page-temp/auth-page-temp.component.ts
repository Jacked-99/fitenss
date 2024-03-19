import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-auth-page-temp',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './auth-page-temp.component.html',
  styleUrl: './auth-page-temp.component.scss',
})
export class AuthPageTempComponent {
  @Input() title = '';
}
