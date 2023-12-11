import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginComponent {
  error = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private cdr: ChangeDetectorRef) {}

  signIn(): void {
    this.error = false;
    const { email, password } = this.form.value;
    this.auth.signIn(email!, password!)
      .subscribe((error) => {
        if (error) {
          this.error = true;
          this.cdr.detectChanges();
        }
      });
  }

}
