import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AuthPageTempComponent } from '../auth-page-temp/auth-page-temp.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    AuthPageTempComponent,
    MatIconModule,
    MatInput,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(
          '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$'
        ),
      ],
    ],
  });
  constructor(private fb: FormBuilder) {}
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
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
}
