import { Component, signal } from '@angular/core';
import { AuthPageTempComponent } from '../auth-page-temp/auth-page-temp.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { v4 as uuid } from 'uuid';
import { UserInt } from '../../shared/user';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    AuthPageTempComponent,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  passwordError = signal('');

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$'),
    ]),
  });
  constructor(private userService: UserService) {}
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  checkErrors(FormControl: AbstractControl | null) {
    if (FormControl?.hasError('required')) {
      return 'You must enter a value';
    } else if (FormControl?.hasError('minlength')) {
      return 'Value must be longer than 5';
    } else if (FormControl?.hasError('pattern')) {
      return 'Value must contain one uppercase, lowercase, number';
    } else {
      return '';
    }
  }
  signUpUser() {
    let newUser: UserInt = {
      id: uuid(),
      username: this.email?.value || '',
      password: this.password?.value || '',
      online: true,
    };
    this.userService.createNewUser(newUser);
  }
}
