import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../shared/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatDivider,
    MatCard,
    MatCardContent,
    MatButtonModule,
    MatCardActions,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent implements OnChanges {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: Product
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
