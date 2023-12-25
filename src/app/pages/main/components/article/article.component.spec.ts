import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticleService } from '../../../../shared/services/article/article.service';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(() => {
    const articleServiceSpyObj = jasmine.createSpyObj('ArticleService', ['getArticlesById']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } },
        { provide: ArticleService, useValue: articleServiceSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get article id from route params', () => {
    component.getArticleId();
    expect(component.articleId).toBe('123');
  });
});
