import { Component, Input } from '@angular/core';
import { Intake } from '../../shared/intake';
import { MatListModule } from '@angular/material/list';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IntakeService } from '../../shared/intake.service';
import { RoundPipe } from '../../utils/round.pipe';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard-list',
  standalone: true,
  imports: [
    MatListModule,
    KeyValuePipe,
    TitleCasePipe,
    FormsModule,
    MatIconButton,
    MatIconModule,
    RoundPipe,
    MatExpansionModule,
  ],
  templateUrl: './dashboard-list.component.html',
  styleUrl: './dashboard-list.component.scss',
})
export class DashboardListComponent {
  constructor(private intake: IntakeService) {}
  @Input() nutrList: Intake[] = [];
  closedState = true;
  onDeleteItemClick(index: number) {
    this.intake.onCaloriesRemove(index);
  }
}
