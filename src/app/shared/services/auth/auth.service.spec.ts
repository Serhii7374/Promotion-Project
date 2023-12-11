import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment.prod';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    const afAuthSpy = jasmine.createSpyObj('AngularFireAuth',
      [
        'signInWithPopup',
        'signInWithEmailAndPassword',
        'createUserWithEmailAndPassword',
        'sendPasswordResetEmail',
        'signOut',
        'updatePassword',
        'currentUser'
      ]);
    const afFirestoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
      ],
      providers: [
        { provide: AngularFireAuth, useValue: afAuthSpy },
        { provide: AngularFirestore, useValue: afFirestoreSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
