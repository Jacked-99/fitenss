import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-dialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.scss',
})
export class DashboardDialogComponent {
  constructor(public dialogRef: DialogRef) {}
  onAddClick() {}
}
