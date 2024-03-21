import { Component } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-product-base-page',
  standalone: true,
  imports: [ContentPageTempComponent, ProductItemComponent, MatExpansionModule],
  templateUrl: './product-base-page.component.html',
  styleUrl: './product-base-page.component.scss',
})
export class ProductBasePageComponent {
  fakeProducts: Product[] = [
    {
      id: '11',
      name: 'oats',
      imgSrc:
        'https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2018/03/oats-701299_1920.jpg',
      desc: 'Healthy carbs',
      data: {
        calories: 360,
        carbs: 55,
        fiber: 11,
        protein: 14,
        fat: 8,
        sugar: 1,
      },
    },
    {
      id: '12',
      name: 'Milk',
      imgSrc:
        'https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg',
      desc: 'From the cow',
      data: {
        calories: 360,
        carbs: 55,
        fiber: 11,
        protein: 14,
        fat: 8,
        sugar: 1,
      },
    },
  ];
}
