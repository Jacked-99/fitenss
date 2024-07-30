import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { Product } from '../../shared/product';
import { TitleCasePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    MatListModule,
    MatExpansionModule,
    TitleCasePipe,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() productData?: Product;
}
