import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Database, onValue, ref, set } from '@angular/fire/database';

const baseUrl =
  'https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Products.json';

type ValType = {
  [key: string]: Product;
};
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
  constructor(private http: HttpClient, private dataBase: Database) {
    //temp
    //przepisac korzystajac z http clinet i metod
  }

  // getProductList() {
  //   return this.productList.asObservable();
  // }

  addProduct(productData: Product) {
    this.productList.next([...this.productList.value, productData]);

    this.setProducts();
  }
  setProducts() {
    set(ref(this.dataBase, 'Products/'), this.productList.value);
    // this.http
    //   .put(baseUrl, JSON.stringify(this.productList.value))
    //   .pipe(take(1))
    //   .subscribe({ next: (val) => console.log(val) });
    // const request = await fetch(
    //   'https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Products.json',
    //   { method: 'PUT', body: JSON.stringify(this.productList.value) }
    // );
    // const response = await request.json();
    // console.log(response);
  }

  getProductData() {
    onValue(ref(this.dataBase, 'Products/'), (snapschot) => {
      this.productList.next(snapschot.val());
    });
    // this.http
    //   .get<Product[]>(baseUrl)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (val) => {
    //       this.productList.next(val);
    //     },
    //   });
  }
  getProduct(id: string) {
    return this.http.get<Product>(
      `https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Products/${id}.json`
    );
  }
}
