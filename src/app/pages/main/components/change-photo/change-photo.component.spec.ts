import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePhotoComponent } from './change-photo.component';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../../environments/environment.prod';

describe('ChangePhotoComponent', () => {
  let component: ChangePhotoComponent;
  let fixture: ComponentFixture<ChangePhotoComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let storageSpy: jasmine.SpyObj<AngularFireStorage>;
  let changeDetectorRefSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['updateUserInformation']);
    storageSpy = jasmine.createSpyObj('AngularFireStorage', ['upload', 'ref']);
    changeDetectorRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AngularFireStorage, useValue: storageSpy },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefSpy },
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(ChangePhotoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
