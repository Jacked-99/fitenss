import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInt } from './user';
import { BehaviorSubject, Subject, take } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: Auth) {}
  user = new Subject<User | null>();
  public readonly $user = this.user.asObservable();

  createNewUser(userData: UserInt) {
    createUserWithEmailAndPassword(
      this.auth,
      userData.username,
      userData.password
    );
    this.changeUserState();
  }
  loginUser(userData: UserInt) {
    signInWithEmailAndPassword(this.auth, userData.username, userData.password);
    this.changeUserState();
  }
  logoutUser() {
    signOut(this.auth);
    this.changeUserState();
  }

  changeUserState() {
    this.user.next(this.auth.currentUser);
  }
}
