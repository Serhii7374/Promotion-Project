import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { IArticle, IUserData } from '../../../../shared/interfaces';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { CATEGORIES } from '../../../../shared/consts';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-article',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './add-new-article.component.html',
  styleUrl: './add-new-article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewArticleComponent implements OnInit {
  protected readonly CATEGORIES = CATEGORIES;
  user!: IUserData;
  fileName = '';
  percentageChanges$!: Observable<number | undefined>;
  disabled: boolean = false;
  imageStatus = false;
  selectedCategory = '';
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  form = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    text: ['', Validators.required],
    imageUrl: ['']
  });

  getUserData(): void {
    const userDataString = localStorage.getItem('user');
    this.user = JSON.parse(userDataString!);
  }

  onClick(fileUpload: HTMLInputElement): void {
    fileUpload.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const filePath = `images/${file.name}` + this.user?.uid;
    const task = this.storage.upload(filePath, file);
    this.percentageChanges$ = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.fileName = file.name;
        this.form.value.imageUrl = url;
        this.imageStatus = true;
        this.cdr.detectChanges();
      });
    });
  }

  createArticle(): void {
    const userName = (this.user.firstName ? this.user.firstName : '') + (this.user.lastName ? ' ' + this.user.lastName : '');

    const newArticle: IArticle = Object.assign(this.form.value, {
      date: Timestamp.fromDate(new Date),
      userId: this.user.uid,
      userName: userName ? userName : 'Anonym',
      userAvatar: this.user.avatarUrl
    }) as IArticle;

    this.articleService.addArticle(newArticle);
  }

}
