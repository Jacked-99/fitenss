import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, take } from 'rxjs';
import { Intake } from './intake';
import { DatabaseIntakeService } from './database-intake.service';

@Injectable({
  providedIn: 'root',
})
export class IntakeService {
  private _currentIntake = new BehaviorSubject<Intake[]>([]);
  public readonly $currentIntake = this._currentIntake.asObservable();
  constructor(private dbService: DatabaseIntakeService) {}
  setData() {
    this.dbService.getData()?.then((snapshot) => {
      if (snapshot) {
        this._currentIntake.next(snapshot.val());
      }
    });
  }
  onCaloriesAdd(values: Intake) {
    if (this._currentIntake.value.find((el) => el.product == values.product)) {
      this._currentIntake.next(
        this._currentIntake.value.map((val: Intake) => {
          if (val.product == values.product) {
            let key: keyof typeof val;
            for (key in val) {
              if (key != 'product') {
                let v = +val[key];
                v += +values[key];
                val[key] = v;
              }
            }
            return val;
          } else {
            return val;
          }
        })
      );
    } else {
      this._currentIntake.next([...this._currentIntake.value, values]);
    }
    this.dbService.setData(this._currentIntake.value);
  }
  onCaloriesRemove(productName: string) {
    this._currentIntake
      .pipe(
        map((newDataArray) =>
          newDataArray.filter((el) => el.product !== productName)
        ),
        take(1)
      )
      .subscribe((val) => this._currentIntake.next([...val]));
    // console.log(fillteredArray);
    // this._currentIntake.next([...fillteredArray.value]);
  }
}
//Users/user.email//intake//date:<Intake>{}
