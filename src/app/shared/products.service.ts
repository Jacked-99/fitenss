import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productList = new BehaviorSubject<Product[]>([
    {
      id: '11',
      name: 'oats',
      imgSrc:
        'https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2018/03/oats-701299_1920.jpg',
      desc: 'Healthy carbs',
      nutrients: {
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
      nutrients: {
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
      name: 'Fake oats',
      imgSrc:
        'https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg',
      desc: 'From the cow',
      nutrients: {
        calories: 360,
        carbs: 55,
        fiber: 11,
        protein: 14,
        fat: 8,
        sugar: 1,
      },
    },
  ]);
  constructor() {}

  addProduct(productData: Product) {
    this.productList.next([...this.productList.getValue(), productData]);
  }
  getProductData() {
    //fetching form db
  }
}
