import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialMediaLoginComponent } from './social-media-login.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AuthProvider } from '../../shared/interfaces';

describe('SocialMediaLoginComponent', () => {
  let component: SocialMediaLoginComponent;
  let fixture: ComponentFixture<SocialMediaLoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['signInWithSocialMedia']);

    TestBed.configureTestingModule({
      declarations: [SocialMediaLoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
      ],
    });

    fixture = TestBed.createComponent(SocialMediaLoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call signInWithSocialMedia method with the correct provider', () => {
    const expectedProvider: AuthProvider = 'google';
    component.signInWithSocialMedia(expectedProvider);
    expect(authService.signInWithSocialMedia).toHaveBeenCalledWith(expectedProvider);
  });
});
