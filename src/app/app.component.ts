import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavLinksComponent } from './components/nav-links/nav-links.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavLinksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fitenss';
}
