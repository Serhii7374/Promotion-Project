import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthProvider } from '../../shared/interfaces';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-social-media-login',
  templateUrl: './social-media-login.component.html',
  styleUrl: './social-media-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialMediaLoginComponent {

  constructor(private auth: AuthService) {}

  signInWithSocialMedia(provider: AuthProvider): void {
    this.auth.signInWithSocialMedia(provider);
  }

}
