import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  child,
  Database,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from '@angular/fire/database';
import { Intake } from './intake';
import { UserService } from './user.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseIntakeService {
  constructor(
    private db: Database,
    private auth: Auth,
    private user: UserService
  ) {}
  dbRef = ref(getDatabase());
  stringDate = new Date()
    .toLocaleString('default', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    .replaceAll('.', '');
  setData(value: Intake[]) {
    set(
      ref(
        this.db,
        `Users/${this.auth.currentUser?.email?.slice(
          0,
          this.auth.currentUser.email.indexOf('@')
        )}/${this.stringDate}`
      ),
      value
    );
  }
  updateData(value: Intake[]) {
    update(
      ref(
        this.db,
        `Users/${this.auth.currentUser?.email?.slice(
          0,
          this.auth.currentUser.email.indexOf('@')
        )}/${this.stringDate}`
      ),
      value
    );
  }
  getData() {
    if (this.auth.currentUser) {
      let userChunck = this.auth.currentUser?.email?.slice(
        0,
        this.auth.currentUser.email.indexOf('@')
      );

      return get(ref(this.db, `Users/${userChunck}/${this.stringDate}`));
    } else {
      return;
    }

    // let userVal: string | null | undefined = '';
    // if (this.auth.currentUser?.email) {
    //   this.user.$user
    //     .pipe(take(1))
    //     .subscribe(
    //       (val) => (userVal = val?.email?.slice(0, val?.email?.indexOf('@')))
    //     );

    //   console.log(this.auth.currentUser?.email);
    //   const starCountRef = ref(db, `/Users/${userVal}`);
    //   onValue(starCountRef, (snapshot) => {
    //     console.log(snapshot.val());
    //   });
    // }

    //   get(
    //     ref(
    //       this.db,
    //       `Users/${this.auth.currentUser?.email?.slice(
    //         0,
    //         this.auth.currentUser.email.indexOf('@')
    //       )}/`
    //     )
    //   ).then((value) => {
    //     console.log(value.val());
    //   });
    // }
  }
  getMonthlyData() {
    if (this.auth.currentUser) {
      let userChunck = this.auth.currentUser?.email?.slice(
        0,
        this.auth.currentUser.email.indexOf('@')
      );

      return get(ref(this.db, `Users/${userChunck}/`));
    } else {
      return;
    }
  }

  removeData(index: number) {
    let userChunck = this.auth.currentUser?.email?.slice(
      0,
      this.auth.currentUser.email.indexOf('@')
    );

    remove(
      ref(this.db, `Users/${userChunck}/${this.stringDate}/${index}`)
    ).then((snapshot) => {});
  }
}
