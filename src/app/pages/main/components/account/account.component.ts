import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ChangePhotoComponent } from '../change-photo/change-photo.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditInformationComponent } from '../edit-information/edit-information.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatTabsModule,
    ChangePhotoComponent,
    ChangePasswordComponent,
    EditInformationComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {

}
