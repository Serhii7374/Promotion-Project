import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../../environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['updatePassword']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: {} }
      ],
    });

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.updatePassword when save is called', () => {
    const updatePasswordSpy = authServiceSpy.updatePassword.and.returnValue(of(null));

    component.form.setValue({
      oldPassword: 'oldPassword123',
      password: 'newPassword123',
      passwordConfirm: 'newPassword123',
    });

    component.save();

    expect(updatePasswordSpy).toHaveBeenCalledWith('oldPassword123', 'newPassword123');
  });

  it('should reset form and show alert if authService.updatePassword returns an error', () => {
    const updatePasswordSpy = authServiceSpy.updatePassword.and.returnValue(of('Error message'));
    const formResetSpy = spyOn(component.form, 'reset');
    const alertSpy = spyOn(window, 'alert');

    component.form.setValue({
      oldPassword: 'oldPassword123',
      password: 'newPassword123',
      passwordConfirm: 'newPassword123',
    });

    component.save();

    expect(updatePasswordSpy).toHaveBeenCalledWith('oldPassword123', 'newPassword123');
    expect(formResetSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Wrong current password');
  });
});
