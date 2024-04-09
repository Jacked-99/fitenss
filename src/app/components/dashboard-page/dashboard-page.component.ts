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
import { Product } from '../../shared/product';

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
    const dialogRef = this.dialog.open<Product>(DashboardDialogComponent, {
      data: {},
    });
    let tempObj: Intake = {
      product: '',
      protein: 0,
      sugar: 0,
      calories: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    };
    dialogRef.closed.pipe().subscribe({
      next: (result) => {
        if (result) {
          tempObj.product = result.name;
          for (let key of Object.keys(tempObj)) {
            if (
              key != 'product' &&
              result.nutrients[key as keyof typeof result.nutrients]
            ) {
              tempObj[key as keyof typeof result.nutrients] =
                result.nutrients[key as keyof typeof result.nutrients];
            }
          }
          this.intakeService.onCaloriesAdd(tempObj);
        }
      },
    });
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
