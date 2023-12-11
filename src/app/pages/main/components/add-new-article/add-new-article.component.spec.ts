import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { AddNewArticleComponent } from './add-new-article.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../../environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { IUserData } from '../../../../shared/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddNewArticleComponent', () => {
  let component: AddNewArticleComponent;
  let fixture: ComponentFixture<AddNewArticleComponent>;
  let angularFireStorageSpy: jasmine.SpyObj<AngularFireStorage>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  let mockUser: IUserData;
  beforeEach(() => {
    angularFireStorageSpy = jasmine.createSpyObj('AngularFireStorage', ['upload', 'ref']);
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['addArticle']);
    mockUser = {
      email: 'email@mail.com',
      uid: '123',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'avatar.jpg',
      age: '33'

    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AngularFireStorage, useValue: angularFireStorageSpy },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: ActivatedRoute, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AddNewArticleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form.get('title')).toBeTruthy();
    expect(component.form.get('category')).toBeTruthy();
    expect(component.form.get('text')).toBeTruthy();
    expect(component.form.get('imageUrl')).toBeTruthy();
  });

  it('should get user data on initialization', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    component.ngOnInit();

    expect(component.user).toEqual(mockUser);
  });

});
