import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, take } from 'rxjs';
import { Intake } from './intake';

@Injectable({
  providedIn: 'root',
})
export class IntakeService {
  private _currentIntake = new BehaviorSubject<Intake[]>([]);
  public readonly $currentIntake = this._currentIntake.asObservable();

  onCaloriesAdd(values: Intake) {
    this._currentIntake.next([...this._currentIntake.value, values]);
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
  constructor() {}
}
