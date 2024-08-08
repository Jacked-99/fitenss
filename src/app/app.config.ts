import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'fitness-page-base',
        appId: '1:119341390161:web:95cfc402d09ef98164db70',
        databaseURL:
          'https://fitness-page-base-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'fitness-page-base.appspot.com',

        apiKey: 'AIzaSyARNMdSJMBvk_N1bTVb9DIOD4zIj03nY5E',
        authDomain: 'fitness-page-base.firebaseapp.com',
        messagingSenderId: '119341390161',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
