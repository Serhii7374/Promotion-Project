import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { IUserData } from '../../../../shared/interfaces';

@Component({
  selector: 'app-edit-information',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './edit-information.component.html',
  styleUrl: './edit-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInformationComponent implements OnInit {
  user!: IUserData;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    age: [''],
  });

  ngOnInit(): void {
    this.getUserData();
    this.setActualDataToForm();
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('user');
    this.user = JSON.parse(userDataString!);
  }

  setActualDataToForm(): void {
    if (this.user) {
      this.form.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        age: this.user.age
      });
    }
  }

  saveDataToDB(): void {
    this.auth.updateUserInformation(this.user.uid, this.form.value);
  }
}
