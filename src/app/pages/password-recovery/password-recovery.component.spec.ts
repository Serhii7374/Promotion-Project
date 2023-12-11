import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PasswordRecoveryComponent } from './password-recovery.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasswordRecoveryComponent', () => {
  let component: PasswordRecoveryComponent;
  let fixture: ComponentFixture<PasswordRecoveryComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['resetPassword']);

    TestBed.configureTestingModule({
      declarations: [PasswordRecoveryComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    formBuilder = TestBed.inject(FormBuilder);

    fixture = TestBed.createComponent(PasswordRecoveryComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should have a valid form on initialization', () => {
  //   expect(component.form.valid).toBeTruthy();
  // });

  it('should call resetPassword method when passwordReset is called', fakeAsync(() => {
    const email = 'test@example.com';
    component.form.setValue({ email });
    component.passwordReset();
    tick();
    expect(authService.resetPassword).toHaveBeenCalledWith(email);
  }));
});
