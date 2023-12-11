import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { IUserData } from '../../../../shared/interfaces';

@Component({
  selector: 'app-change-photo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './change-photo.component.html',
  styleUrl: './change-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePhotoComponent implements OnInit {
  user!: IUserData;
  fileName = '';
  percentageChanges$!: Observable<number | undefined>;
  avatarUrl = '';
  imageStatus = false;
  disabled: boolean = false;
  constructor(private storage: AngularFireStorage, private cdr: ChangeDetectorRef, private auth: AuthService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('user');
    this.user = JSON.parse(userDataString!);
  }

  onClick(fileUpload: HTMLInputElement): void {
    fileUpload.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const filePath = `images/${file.name}` + this.user.uid;
    const task = this.storage.upload(filePath, file);
    this.percentageChanges$ = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.fileName = file.name;
        this.avatarUrl = url;
        this.imageStatus = true;
        this.cdr.detectChanges();
      });
    });
  }

  save(): void {
    const newUrl = {
      avatarUrl: this.avatarUrl
    };
    this.auth.updateUserInformation(this.user.uid, newUrl);
  }
}
