import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContentPageTempComponent } from '../content-page-temp/content-page-temp.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
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
import { ProductsService } from '../../shared/products.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

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
    MatAccordion,
    MatIconModule,
  ],
  templateUrl: './product-base-page.component.html',
  styleUrl: './product-base-page.component.scss',
})
export class ProductBasePageComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) accordion?: MatAccordion;
  productList!: Product[];
  productSub!: Subscription;
  constructor(public dialog: Dialog, private productService: ProductsService) {}
  ngOnInit(): void {
    this.productService.getProductData();
    this.productSub = this.productService._productList.subscribe({
      next: (value) => {
        this.productList = value;
      },
    });
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
      this.productList = this.productList.filter((product) =>
        product.name
          .toLowerCase()
          .includes(this.searchTerm.value!.toLowerCase())
      );
    }
  }
  onDialogOpen(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, { data: {} });
    dialogRef.closed.subscribe((result: any) => {
      let id = this.productList.length.toString();
      if (result) {
        let newProduct = {
          id: id.toString(),
          name: result.name,
          nutrients: result.nutrients,
          desc: result.desc,
        };
        this.productService.addProduct(newProduct);
      }
    });
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }
}
