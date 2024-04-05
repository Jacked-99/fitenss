import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Intake } from '../../shared/intake';
import { ProductsService } from '../../shared/products.service';
import { take } from 'rxjs';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-dashboard-dialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.scss',
})
export class DashboardDialogComponent implements OnInit {
  productList: Product[] = [];
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: Intake,
    private productService: ProductsService
  ) {}
  onAddClick() {
    console.log(this.productList);
  }
  ngOnInit(): void {
    this.productService
      .getProductList()
      .pipe(take(1))
      .subscribe((val) => (this.productList = [...val]));
  }
}
