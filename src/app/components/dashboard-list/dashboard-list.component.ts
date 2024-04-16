import { Component, Input } from '@angular/core';
import { Intake } from '../../shared/intake';
import { MatListModule } from '@angular/material/list';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [MatListModule, KeyValuePipe],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss',
})
export class DashboardListComponent {
  @Input() nutrList: Intake[] = [];
}
