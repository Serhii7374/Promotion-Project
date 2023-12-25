import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ArticleService } from '../../shared/services/article/article.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from '../../shared/interfaces';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let articleService: jasmine.SpyObj<ArticleService>;
  let router: jasmine.SpyObj<Router>;
  let mockUser: IUserData;

  const userSubject = new BehaviorSubject<IUserData | null>(null);

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['signOut'], { user$: userSubject.asObservable() });
    articleService = jasmine.createSpyObj('ArticleService', ['setSearchQuery']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    mockUser = {
      email: 'email@mail.com',
      uid: '123',
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'avatar.jpg',
      age: '33'
    };

    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [MainComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ArticleService, useValue: articleService },
        { provide: Router, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.signOut() on logout', () => {
    component.logout();
    expect(authService.signOut).toHaveBeenCalled();
  });

  it('should call articleService.setSearchQuery() and navigate on search', () => {
    component.searchText = 'test';
    component.search();
    expect(articleService.setSearchQuery).toHaveBeenCalledWith('test');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.searchText).toBe('test'); // Optional: assert that searchText is cleared
  });

  it('should set user properties on user$ emission', () => {
    userSubject.next(mockUser);
    expect(component.user).toEqual(mockUser);
    expect(component.user.avatarUrl).toBe(mockUser.avatarUrl);
    expect(component.userName).toBe('John Doe');
  });
});
