import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../shared/product';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-dialog-list',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatIcon, TitleCasePipe],
  templateUrl: './dashboard-dialog-list.component.html',
  styleUrl: './dashboard-dialog-list.component.scss',
})
export class DashboardDialogListComponent {
  @Input() productList!: Product[];
  @Output() SelectedProduct = new EventEmitter<number>();

  onProductClick(id: number) {
    this.SelectedProduct.emit(id);
  }
}
