import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { MatDivider } from '@angular/material/divider';
import { ChartComponent } from '../chart/chart.component';
import { MatButtonModule } from '@angular/material/button';
import { IntakeService } from '../../shared/intake.service';
import { Subscription, take } from 'rxjs';
import { Intake } from '../../shared/intake';
import { UpperCasePipe } from '@angular/common';
import { KeyValuePipe } from '@angular/common';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    ContentPageTempComponent,
    MatDivider,
    ChartComponent,
    MatButtonModule,
    UpperCasePipe,
    KeyValuePipe,
    DialogModule,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  intakeSub!: Subscription;
  currentCalories: Intake[] = [];
  constructor(private intakeService: IntakeService, private dialog: Dialog) {}
  onDialogOpen() {
    // this.intakeService.onCaloriesAdd({
    //   product: 'oats',
    //   calories: 5,
    //   protein: 5,
    //   fat: 5,
    //   carbs: 5,
    //   sugar: 5,
    //   fiber: 5,
    // });
    console.log(this.currentCalories);
    const dialogRef = this.dialog.open(DashboardDialogComponent, { data: {} });
    dialogRef.closed.pipe().subscribe((result: any) =>
      //convert result data to Intake type, then add via service method
      this.intakeService.onCaloriesAdd(result.nutrients)
    );
  }
  onDialogClose() {
    this.intakeService.onCaloriesRemove('oats');
  }
  getProductKeys() {
    return Object.keys(this.currentCalories[0]);
  }
  ngOnInit(): void {
    this.intakeSub = this.intakeService.$currentIntake.subscribe(
      (val) => (this.currentCalories = [...val])
    );
  }
  ngOnDestroy(): void {
    this.intakeSub.unsubscribe();
  }
}
