import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createNewUser(userData: User) {
    this.http
      .post(
        `https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Users/${userData.id}.json`,
        JSON.stringify(userData)
      )
      .pipe(take(1))
      .subscribe({
        next: (response) => console.log(response),
        error: (err) => console.log(err.message),
      });
  }
  loginUser(userData: User) {
    this.http
      .patch(
        `https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app/Users/${userData.id}.json`,
        JSON.stringify(userData)
      )
      .pipe(take(1))
      .subscribe((res) => console.log(res));
  }
  logoutUser() {}
}
