import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../shared/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { getNutreintData } from '../../utils/getNutrientValue';
import { ProductForm } from '../../shared/product-form';

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
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss',
})
export class ProductDialogComponent implements OnChanges {
  productData = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl(''),
    nutrients: new FormGroup({
      calories: new FormControl(0),
      fat: new FormControl(0),
      protein: new FormControl(0),
      carbs: new FormControl(0),
      sugar: new FormControl(0),
      fiber: new FormControl(0),
    }),
  });
  previousSugarValue = 0;
  previousCaloreis: { macro: string; value: number }[] = [];
  constructor(
    public dialogRef: DialogRef<any>,
    @Inject(DIALOG_DATA) public data: Product
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  onSugarChange() {
    const current = this.productData.controls.nutrients.value.carbs || 0;
    const sugarValue = this.productData.controls.nutrients.value.sugar || 0;
    if (current > 0) {
      this.productData.controls.nutrients.patchValue({
        carbs: current - this.previousSugarValue + sugarValue,
      });
    } else {
      this.productData.controls.nutrients.patchValue({
        carbs: current + sugarValue,
      });
    }
    this.previousSugarValue = sugarValue;
    this.onNutrChange('carbs');
  }
  onNutrChange(name: string) {
    let tempResult = 0;
    let value =
      this.productData.controls.nutrients.value[
        name as keyof typeof this.productData.controls.nutrients.value
      ] || 0;

    let numOfCal = getNutreintData(name) * value;
    // if (name == this.previousCaloreis.macro) {
    //   this.productData.controls.nutrients.patchValue({
    //     calories: currentCalories - this.previousCaloreis.value + numOfCal,
    //   });
    // } else {
    //   this.productData.controls.nutrients.patchValue({
    //     calories: currentCalories + numOfCal,
    //   });
    // }
    if (
      this.previousCaloreis.filter((element) => element.macro == name).length ==
      0
    ) {
      this.previousCaloreis.push({ macro: name, value: numOfCal });
    } else {
      this.previousCaloreis.map((nutr) => {
        nutr.macro == name ? (nutr.value = numOfCal) : nutr;
      });
    }
    this.previousCaloreis.forEach((nutr) => (tempResult += nutr.value));
    this.productData.controls.nutrients.patchValue({
      calories: tempResult,
    });
  }
  onAddClick() {
    if (this.productData.valid) {
      this.dialogRef.close(this.productData.value);
    }
  }
}
