import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { passwordMatchValidator } from '../../shared/password-match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    age: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', Validators.required],
    policyConfirm: [false, Validators.required]
  }, { validators: [passwordMatchValidator()] });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  get password(): any {
    return this.form.controls['password'];
  }

  singUp(): void {
    const { email, password, name, age } = this.form.value;
    if (email && password) {
      this.auth.createUser(email, password, name!, age!)
        .subscribe((error) => {
          if (error) {
            console.error('Помилка при створенні користувача:', error);
          }
        });
    }
  }
}
