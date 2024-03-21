import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-product-base-page',
  standalone: true,
  imports: [ContentPageTempComponent, ProductItemComponent, MatExpansionModule],
  templateUrl: './product-base-page.component.html',
  styleUrl: './product-base-page.component.scss',
})
export class ProductBasePageComponent {}
