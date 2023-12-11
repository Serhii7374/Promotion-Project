import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['signIn']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email and password controls', () => {
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
  });
  //
  it('should call signIn method on authService when signIn is called', () => {
    const email = 'test@example.com';
    const password = 'password123';

    component.form.setValue({ email, password });
    authService.signIn.and.returnValue(of(null));
    component.signIn();
    expect(authService.signIn).toHaveBeenCalledWith(email, password);
  });

  it('should display an alert if signIn returns an error', () => {
    const error = 'Invalid credentials';

    authService.signIn.and.returnValue(of(error));
    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.signIn();

    expect(window.alert).toHaveBeenCalledWith('Incorrect login or password');
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
