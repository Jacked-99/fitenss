import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product-base-page',
  standalone: true,
  imports: [ContentPageTempComponent, ProductItemComponent],
  templateUrl: './product-base-page.component.html',
  styleUrl: './product-base-page.component.scss',
})
export class ProductBasePageComponent {}
