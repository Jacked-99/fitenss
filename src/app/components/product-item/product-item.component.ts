import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { Product } from '../../shared/product';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatListModule, MatExpansionModule, TitleCasePipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() productData?: Product;
}
