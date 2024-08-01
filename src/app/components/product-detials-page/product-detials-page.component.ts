import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductsService } from '../../shared/products.service';
import { Subscription } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { ChartComponent } from '../chart/chart.component';
import { ChartService } from '../../shared/chart.service';
import { Intake } from '../../shared/intake';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { TitleCasePipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-detials-page',
  standalone: true,
  imports: [
    MatListModule,
    ChartComponent,
    ContentPageTempComponent,
    TitleCasePipe,
  ],
  templateUrl: './product-detials-page.component.html',
  styleUrl: './product-detials-page.component.scss',
})
export class ProductDetialsPageComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isMobile = false;
  productData?: Product;
  productSub?: Subscription;

  constructor(
    private prodeuctService: ProductsService,
    private chartService: ChartService,
    private breakpoint: BreakpointObserver
  ) {}
  ngOnInit(): void {
    let idVal = this.id?.slice(0, this.id?.indexOf('_'));
    if (idVal) {
      this.prodeuctService.getProduct(idVal?.toString()).subscribe({
        next: (val) => (
          (this.productData = val),
          this.chartService.setChartData(this.createIntake(this.productData!))
        ),
      });
    }
    this.breakpoint
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) =>
        result.matches ? (this.isMobile = true) : (this.isMobile = false)
      );
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }
  createIntake(data: Product) {
    let intakeData: Intake[] = [];
    let temp = {} as any;
    if (data) {
      let keys: keyof typeof data.nutrients;
      for (keys in data.nutrients) {
        temp[keys] = data.nutrients[keys];
      }
      temp['product'] = data.name;
      intakeData.push(temp);
    }
    return intakeData;
  }
}
