import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { MatDivider } from '@angular/material/divider';
import { ChartComponent } from '../chart/chart.component';
import { MatButtonModule } from '@angular/material/button';
import { IntakeService } from '../../shared/intake.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { Intake } from '../../shared/intake';
import { NgClass, UpperCasePipe } from '@angular/common';
import { KeyValuePipe } from '@angular/common';
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';
import { Product } from '../../shared/product';
import { chartData, createChartData } from '../../utils/createChartData';
import { ChartService } from '../../shared/chart.service';
import { DashboardListComponent } from '../dashboard-list/dashboard-list.component';
import { ToggableSectionTempComponent } from '../toggable-section-temp/toggable-section-temp.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    DashboardListComponent,
    ToggableSectionTempComponent,
    NgClass,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  intakeSub!: Subscription;
  currentCalories: Intake[] = [];
  chartData = new BehaviorSubject([] as chartData[]);
  isMobile = false;
  constructor(
    private intakeService: IntakeService,
    private dialog: Dialog,
    private chartServ: ChartService,
    private breakpoints: BreakpointObserver
  ) {}
  getChartData() {
    this.chartServ.setChartData(this.currentCalories);
  }
  onDialogOpen() {
    const dialogRef = this.dialog.open<{
      name: string;
      nutrients: {
        calories: number;
        protein: number;
        fat: number;
        carbs: number;
        sugar: number;
        fiber: number;
      };
      weight: number;
    }>(DashboardDialogComponent, {
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
    dialogRef.closed.subscribe({
      next: (result) => {
        if (result) {
          tempObj.product = result.name;
          for (let key of Object.keys(tempObj)) {
            if (
              key != 'product' &&
              result.nutrients[key as keyof typeof result.nutrients]
            ) {
              tempObj[key as keyof typeof result.nutrients] =
                result.nutrients[key as keyof typeof result.nutrients] *
                (+(result.weight || 1) / 100);
            }
          }
          this.intakeService.onCaloriesAdd(tempObj);
        }
        this.getChartData();
      },
    });
  }
  onDialogClose() {
    // this.intakeService.onCaloriesRemove('oats');
  }

  getProductKeys() {
    return Object.keys(this.currentCalories[0]);
  }
  ngOnInit(): void {
    this.intakeSub = this.intakeService.$currentIntake.subscribe(
      (val) => (this.currentCalories = [...val])
    );
    this.breakpoints.observe([Breakpoints.Handset]).subscribe({
      next: (val) => {
        this.isMobile = val.matches;
      },
    });
  }
  ngOnDestroy(): void {
    this.intakeSub.unsubscribe();
  }
}
