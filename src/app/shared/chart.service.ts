import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { chartData, createChartData } from '../utils/createChartData';
import { Intake } from './intake';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chartData = new BehaviorSubject<chartData>({} as any);
  public readonly $chartData = this.chartData.asObservable();

  setChartData(value: Intake[]) {
    this.chartData.next(createChartData(value));
  }

  constructor() {}
}
