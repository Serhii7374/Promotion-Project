import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userData: any;

  beforeEach(() => {
    userData = {
      email: 'test@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
      name: 'John',
      age: '33',
      policyConfirm: true
    };

    authService = jasmine.createSpyObj('AuthService', ['createUser']);

    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser method when signUp is called', fakeAsync(() => {

    component.form.setValue(userData);
    authService.createUser.and.returnValue(of(userData));
    component.singUp();
    tick();
    expect(authService.createUser).toHaveBeenCalledWith(
      userData.email,
      userData.password,
      userData.name,
      userData.age
    );
  }));

  it('should log an error if createUser returns an error', fakeAsync(() => {
    const error = 'User creation failed';
    component.form.setValue(userData);
    const consoleErrorSpy = spyOn(console, 'error');
    authService.createUser.and.returnValue(of(error));
    component.singUp();
    tick();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Помилка при створенні користувача:', error);
  }));
});
