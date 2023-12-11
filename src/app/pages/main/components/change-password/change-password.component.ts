import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { passwordMatchValidator } from '../../../../shared/password-match.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  form = this.fb.group({
    oldPassword: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', Validators.required]
  }, { validators: [passwordMatchValidator()] });

  get password(): any {
    return this.form.controls['password'];
  }

  save(): void {
    this.auth.updatePassword(this.form.value.oldPassword!, this.form.value.password!)
      .subscribe((error) => {
        if (error) {
          this.form.reset();
          alert('Wrong current password');
        }
      });
  }

}
