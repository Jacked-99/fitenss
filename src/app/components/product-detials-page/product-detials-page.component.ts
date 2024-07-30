import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-detials-page',
  standalone: true,
  imports: [],
  templateUrl: './product-detials-page.component.html',
  styleUrl: './product-detials-page.component.scss',
})
export class ProductDetialsPageComponent {
  @Input() id?: string;
}
