import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartData } from 'chart.js/auto';
import { chartData } from '../../utils/createChartData';
import { Subscription, from } from 'rxjs';
import { ChartService } from '../../shared/chart.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() labels: string[] = [];
  @Input() dataPoints: number[] = [];
  @Input() chartData: chartData = {} as any;
  chart: any;
  chartSub!: Subscription;
  colors: string[] = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];
  constructor(private chartService: ChartService) {}
  createBackgroundColor() {
    let colorsArr = [];
    if (this.chartData)
      for (let len = 0; len < this.chartData.values.length; len++) {
        colorsArr.push(
          `rgb(${Math.random() * 255 + 1}, ${Math.random() * 255 + 1}, ${
            Math.random() * 255 + 1
          })`
        );
      }

    this.colors = [...colorsArr];
  }
  updateChart() {}
  onCreateChart() {
    if (this.chart == undefined) {
      // this.createBackgroundColor();
      this.chart = new Chart('chartEl', {
        type: 'doughnut',
        data: {
          datasets: [
            // ...this.chartData.values.map((val) => {
            //   return {
            //     label: val.nutr,
            //     data: [val.value],
            //     backgroundColor: `rgb(${Math.random() * 255}, ${
            //       Math.random() * 255
            //     }, ${Math.random() * 255})`,
            //   };
            // }),
            {
              data: [...this.chartData.values.map((val) => val.value)],
              backgroundColor: [...this.colors],
            },
          ],

          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            ...this.chartData.values.map(
              (val) => val.nutr.charAt(0).toUpperCase() + val.nutr.slice(1)
            ),
          ],
        },
        options: {
          plugins: {
            title: {
              text: 'Nutrient breakdown (in grams)',
            },
            legend: {
              labels: {
                textAlign: 'left',
              },
            },
          },
        },
      });
    } else {
      let newVal = [...this.chartData.values.map((val) => val.value)];
      this.chart.data.datasets[0].data.forEach((element: any) => {
        let indexVal = this.chart.data.datasets[0].data.indexOf(element);

        this.chart.data.datasets[0].data.splice(indexVal, 1, newVal[indexVal]);
      });

      this.chart.update();
    }
  }
  ngOnInit(): void {
    this.chartSub = this.chartService.$chartData.subscribe({
      next: (val) => {
        this.chartData = val;
        this.onCreateChart();
      },
    });
    // if (!this.chart) {
    //   this.onCreateChart();
    // } else {
    //   console.log('yup');
    //   this.updateChart();
    // }
  }

  ngOnDestroy(): void {
    this.chartSub.unsubscribe();
  }
}
