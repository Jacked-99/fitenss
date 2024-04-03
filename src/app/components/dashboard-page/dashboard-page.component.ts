import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { MatDivider } from '@angular/material/divider';
import { ChartComponent } from '../chart/chart.component';
import { MatButtonModule } from '@angular/material/button';
import { IntakeService } from '../../shared/intake.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    ContentPageTempComponent,
    MatDivider,
    ChartComponent,
    MatButtonModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  intakeSub!: Subscription;
  constructor(private intakeService: IntakeService) {}
  onDialogOpen() {
    this.intakeService.onCaloriesAdd({
      product: 'oats',
      calories: 5,
      protein: 5,
      fat: 5,
      carbs: 5,
      sugar: 5,
      fiber: 5,
    });
  }
  onDialogClose() {
    this.intakeService.onCaloriesRemove('oats');
  }
  ngOnInit(): void {
    this.intakeSub = this.intakeService.$currentIntake.subscribe((val) =>
      console.log(val)
    );
  }
  ngOnDestroy(): void {
    this.intakeSub.unsubscribe();
  }
}
