import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productList = new BehaviorSubject<Product[]>([
    // {
    //   id: '11',
    //   name: 'oats',
    //   imgSrc:
    //     'https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2018/03/oats-701299_1920.jpg',
    //   desc: 'Healthy carbs',
    //   nutrients: {
    //     calories: 360,
    //     carbs: 55,
    //     fiber: 11,
    //     protein: 14,
    //     fat: 8,
    //     sugar: 1,
    //   },
    // },
    // {
    //   id: '12',
    //   name: 'Milk',
    //   imgSrc:
    //     'https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg',
    //   desc: 'From the cow',
    //   nutrients: {
    //     calories: 360,
    //     carbs: 55,
    //     fiber: 11,
    //     protein: 14,
    //     fat: 8,
    //     sugar: 1,
    //   },
    // },
    // {
    //   id: '12',
    //   name: 'Fake oats',
    //   imgSrc:
    //     'https://cdn.britannica.com/77/200377-050-4326767F/milk-splashing-glass.jpg',
    //   desc: 'From the cow',
    //   nutrients: {
    //     calories: 360,
    //     carbs: 55,
    //     fiber: 11,
    //     protein: 14,
    //     fat: 8,
    //     sugar: 1,
    //   },
    // },
  ]);
  public readonly _productList = this.productList.asObservable();
  constructor() {}
  // getProductList() {
  //   return this.productList.asObservable();
  // }
  addProduct(productData: Product) {
    this.productList.next([...this.productList.value, productData]);
    this.setProducts();
  }
  async setProducts() {
    const request = await fetch(
      'https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Products.json',
      { method: 'PUT', body: JSON.stringify(this.productList.value) }
    );
    const response = await request.json();
    console.log(response);
  }
  async getProductData() {
    const request = await fetch(
      'https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Products.json',
      { method: 'GET' }
    );
    const data = await request.json();
    console.log(data);
    this.productList.next(data);
    //fetching form db
  }
}
