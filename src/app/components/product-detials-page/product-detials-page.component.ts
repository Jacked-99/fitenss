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
    let idVal = this.id?.slice(0, this.id?.indexOf('_'));
    if (idVal) {
      this.prodeuctService.getProduct(idVal?.toString()).subscribe({
        next: (val) => (this.productData = val),
      });
    }
  }
  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
  }
}
