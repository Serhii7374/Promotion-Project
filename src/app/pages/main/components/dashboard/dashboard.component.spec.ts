import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { IArticle, IUserData } from '../../../../shared/interfaces';
import { AVATAR, CATEGORIES, DEFAULT_BACKGROUND, SORT_OPTIONS } from '../../../../shared/consts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../../environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  // let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async () => {
    const articleServiceSpyObj = jasmine.createSpyObj('ArticleService',
      [
        'getArticles',
        'getAllArticles',
        'searchQuery$',
        'getArticlesByCategory',
        'deleteArticle'
      ]
    );

    // let angularFireStorageSpy;
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
      ],
      providers: [
        { provide: ArticleService, useValue: articleServiceSpyObj },
        ChangeDetectorRef,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getArticles on getArticles', () => {
    spyOn(component, 'getArticles');
    component.getArticles();
    expect(component.getArticles).toHaveBeenCalled();
  });

  it('should call sorting with selectedSortOption on getArticles', () => {
    spyOn(component, 'sorting');
    component.getArticles();
    expect(component.sorting).toHaveBeenCalledWith(component.selectedSortOption);
  });

  it('should call getArticlesBySearch on getArticlesBySearch', () => {
    spyOn(component, 'getArticlesBySearch');
    const searchString = 'test';
    component.getArticlesBySearch(searchString);
    expect(component.getArticlesBySearch).toHaveBeenCalledWith(searchString);
  });

  it('should call getAllArticles on getAllArticles', () => {
    spyOn(component, 'getAllArticles');
    component.getAllArticles();
    expect(component.getAllArticles).toHaveBeenCalled();
  });

  it('should call sorting with selectedSortOption on getAllArticles', () => {
    spyOn(component, 'sorting');
    component.getAllArticles();
    expect(component.sorting).toHaveBeenCalledWith(component.selectedSortOption);
  });

  it('should call sorting with selectedSortOption on sorting', () => {
    spyOn(component, 'sorting');
    const option = 'Descending';
    component.sorting(option);
    expect(component.sorting).toHaveBeenCalledWith(option);
  });

  it('should call deleteArticle on deleteArticle', () => {
    spyOn(component, 'deleteArticle');
    const articleId = '123';
    component.deleteArticle(articleId);
    expect(component.deleteArticle).toHaveBeenCalledWith(articleId);
  });
});
