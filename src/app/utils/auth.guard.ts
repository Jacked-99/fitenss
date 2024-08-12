import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';
import { redirect } from 'react-router-dom';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  if (auth.currentUser) {
    return true;
  } else {
    return false;
  }
};
