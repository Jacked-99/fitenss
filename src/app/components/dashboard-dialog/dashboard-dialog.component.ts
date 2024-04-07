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
  selectedProductCopy!: Product;
  displayList = false;
  currentCalories = 0;
  productName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  productWeight = new FormControl(null, Validators.required);
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
      for (let key of Object.keys(this.selectedProduct.nutrients)) {
        this.selectedProduct.nutrients[
          key as keyof typeof this.selectedProduct.nutrients
        ] *= +(this.productWeight.value || 100) / 100;
      }
      this.dialogRef.close(this.selectedProduct);
    }
  }
  onSearchClick() {
    if (this.productName.value != null) {
      this.searchedList = this.productList.filter((val) =>
        val.name
          .toLowerCase()
          .includes(this.productName.value?.toLowerCase() || '')
      );
    }
    this.displayList = true;
  }
  onProductSelect(value: Product) {
    this.selectedProduct = value;
    this.displayList = false;
  }
  onWeightChange() {
    this.currentCalories = Math.round(
      this.selectedProduct.nutrients.calories *
        (+(this.productWeight.value || 100) / 100)
    );
  }
  ngOnInit(): void {
    this.productService
      .getProductList()
      .pipe(take(1))
      .subscribe((val) => (this.productList = [...val]));
  }
}
