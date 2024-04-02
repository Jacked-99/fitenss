import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  @Input() labels: string[] = [];
  @Input() dataPoints: number[] = [];
  chart: any;
  onCreateChart() {
    this.chart = new Chart('chartEl', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: [100, 200, 300],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
          },
        ],
      },
    });
  }
  ngOnInit(): void {
    this.onCreateChart();
  }
}
