import { Component, OnInit } from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Product } from '../../shared/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-base-page',
  standalone: true,
  imports: [
    ContentPageTempComponent,
    ProductItemComponent,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    DialogModule,
  ],
  templateUrl: './product-base-page.component.html',
  styleUrl: './product-base-page.component.scss',
})
export class ProductBasePageComponent implements OnInit {
  fakeProducts: Product[] = [
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
  ];
  productList!: Product[];
  constructor(public dialog: Dialog) {}
  ngOnInit(): void {
    this.productList = this.fakeProducts;
  }
  searchTerm = new FormControl('', Validators.minLength(1));
  writeSearch() {
    // if (this.searchTerm.value != null) {
    //   this.productList = this.fakeProducts.filter((product) =>
    //     product.name
    //       .toLowerCase()
    //       .includes(this.searchTerm.value!.toLowerCase())
    //   );
    // }
    // console.log(this.searchTerm.value);
  }
  searchClick() {
    if (this.searchTerm.value != null) {
      this.productList = this.fakeProducts.filter((product) =>
        product.name
          .toLowerCase()
          .includes(this.searchTerm.value!.toLowerCase())
      );
    }
  }
  onDialogOpen(): void {
    // const newProductData: Product;

    const dialogRef = this.dialog.open(ProductDialogComponent, {});
    dialogRef.closed.subscribe((result) => {
      let id = this.productList.length;
      if (result) {
        this.fakeProducts.push();
      }
    });
  }
}
