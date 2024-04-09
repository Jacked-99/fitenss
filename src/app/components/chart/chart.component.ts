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
  data = { val: 10, lab: 'red' };
  onCreateChart() {
    this.chart = new Chart('chartEl', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [this.data.val, 20, 30],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [this.data.lab, 'Yellow', 'Blue'],
      },
    });
  }
  ngOnInit(): void {
    this.onCreateChart();
  }
}
