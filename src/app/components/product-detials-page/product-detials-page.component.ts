import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/product';
import { ProductsService } from '../../shared/products.service';
import { Subscription } from 'rxjs';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-product-detials-page',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './product-detials-page.component.html',
  styleUrl: './product-detials-page.component.scss',
})
export class ProductDetialsPageComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  productData?: Product;
  productSub?: Subscription;

  constructor(private prodeuctService: ProductsService) {}
  ngOnInit(): void {
    this.productSub = this.prodeuctService._productList.subscribe({
      next: (value) => {
        this.productData = value.filter((val) => val.name == this.id)[0];
      },
    });
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }
}
