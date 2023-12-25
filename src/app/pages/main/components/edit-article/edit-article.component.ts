import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IArticle, IUserData } from '../../../../shared/interfaces';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CATEGORIES } from '../../../../shared/consts';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArticleComponent implements OnInit, OnDestroy {
  protected readonly CATEGORIES = CATEGORIES;
  private destroy$ = new Subject<void>();
  user!: IUserData;
  fileName = '';
  percentageChanges$!: Observable<number | undefined>;
  disabled: boolean = false;
  imageStatus = false;
  selectedCategory = '';
  articleId!: string;
  article!: IArticle;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getArticleId();
    this.getArticle();
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

  getArticleId(): void {
    this.articleId = this.route.snapshot.params['id'];
  }

  getArticle(): void {
    this.articleService.getArticlesById(this.articleId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((article: IArticle) => {
        this.setActualArticleDataToForm(article);
        this.article = article;
      });
  }

  setActualArticleDataToForm(article: IArticle): void {
    if (article) {
      this.form.setValue({
        title: article.title,
        category: article.category,
        text: article.text,
        imageUrl: article.imageUrl,
      });
    }
  }

  updateArticle(): void {
    this.articleService.updateArticle(this.articleId, this.createArticle())
      .then(()=> {
        this.router.navigate(['']);
      })
      .catch((error) => {
        alert(error);
      });
  }

  createArticle(): IArticle {
    const userName = (this.user.firstName ? this.user.firstName : '') + (this.user.lastName ? ' ' + this.user.lastName : '');

    return Object.assign(this.form.value, {
      date: this.article.date,
      userId: this.user.uid,
      userName: userName ? userName : 'Anonym',
      userAvatar: this.user.avatarUrl
    }) as IArticle;
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
