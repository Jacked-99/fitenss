import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Intake } from '../../shared/intake';
import { ProductsService } from '../../shared/products.service';
import { take } from 'rxjs';
import { Product } from '../../shared/product';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { DashboardDialogListComponent } from '../dashboard-dialog-list/dashboard-dialog-list.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIcon,
    MatFormField,
    DashboardDialogListComponent,
    TitleCasePipe,
  ],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.scss',
})
export class DashboardDialogComponent implements OnInit {
  productList: Product[] = [];
  searchedList: Product[] = [];
  selectedProduct!: Product;
  displayList = false;
  currentCalories = 0;
  productName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  productWeight = new FormControl(0, Validators.required);
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: Intake,
    private productService: ProductsService
  ) {}

  onAddClick() {
    if (
      this.selectedProduct &&
      this.productName.valid &&
      this.productWeight.valid
    ) {
      let newProductData = {
        name: this.selectedProduct.name,
        nutrients: this.selectedProduct.nutrients,
        weight: this.productWeight.value,
      };
      // console.log('before ' + newProductData.nutrients);
      // for (let key of Object.keys(newProductData.nutrients)) {
      //   let curentValue =
      //     newProductData.nutrients[
      //       key as keyof typeof newProductData.nutrients
      //     ];
      //   console.log('current ' + curentValue);
      //   let newValue = Math.round(
      //     curentValue * (+(this.productWeight.value || 1) / 100)
      //   );
      //   console.log('new ' + newValue);

      //   console.log(newProductData.nutrients);
      //   newProductData.nutrients[key as keyof typeof newProductData.nutrients] =
      //     newValue;
      //   //   (newProductData.nutrients[
      //   //     key as keyof typeof newProductData.nutrients
      //   //   ] *
      //   //     +(this.productWeight.value || 1)) /
      //   //     100;
      // }
      this.dialogRef.close(newProductData);
    }
  }
  onSearchClick() {
    if (this.productName.value != '') {
      this.searchedList = this.productList.filter((val) =>
        val.name
          .toLowerCase()
          .includes(this.productName.value?.toLowerCase() || '')
      );
    }
    this.displayList = true;
  }
  onProductSelect(value: string) {
    console.log('val ' + value);
    this.selectedProduct =
      this.productList.find((val) => val.id == value) || ({} as any);
    console.log(this.selectedProduct);
    this.displayList = false;
  }
  onWeightChange() {
    let productCalories = this.selectedProduct.nutrients.calories;
    this.currentCalories = Math.round(
      productCalories * (+(this.productWeight.value || 1) / 100)
    );
  }
  ngOnInit(): void {
    this.productService._productList
      .pipe(take(1))
      .subscribe({ next: (val) => (this.productList = [...val]) });
  }
}
