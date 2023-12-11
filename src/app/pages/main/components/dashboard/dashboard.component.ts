import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { map, Observable, Subscription } from 'rxjs';
import { IArticle, IUserData } from '../../../../shared/interfaces';
import { AVATAR, CATEGORIES, DEFAULT_BACKGROUND, SORT_OPTIONS } from '../../../../shared/consts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;
  protected readonly AVATAR = AVATAR;
  protected readonly CATEGORIES = CATEGORIES;
  protected readonly SORT_OPTIONS = SORT_OPTIONS;

  user!: IUserData;

  selectedCategory = 'All Categories';
  selectedSortOption = 'Ascending';

  articles$!: Observable<IArticle[]>;

  search = false;

  searchQuerySubscription!: Subscription;

  constructor(private articleService: ArticleService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getUserData();
    this.initializeSearchQuerySubscription();
    this.sorting(this.selectedSortOption);
  }

  getUserData(): void {
    const userDataString = localStorage.getItem('user');
    this.user = JSON.parse(userDataString!);
  }

  initializeSearchQuerySubscription(): void {
    this.searchQuerySubscription = this.articleService.searchQuery$.subscribe((query) => {
      if (query) {
        this.getArticlesBySearch(query);
      } else {
        this.getAllArticles();
      }
    });
  }

  getArticles(): void {
    this.articles$ = this.articleService.getArticles(this.user?.uid);
    this.sorting(this.selectedSortOption);
  }

  getArticlesBySearch(searchString: string): void {
    this.articles$ = this.articleService.getAllArticles().pipe(
      map(articles => articles.filter(elem => elem.title.toLowerCase().includes(searchString.toLowerCase())))
    );
    this.search = true;
    this.selectedCategory = 'Search result';
    this.cdr.detectChanges();
  }

  getArticlesByCategory(category: string): void {
    this.articles$ = this.articleService.getArticlesByCategory(category);
    this.sorting(this.selectedSortOption);
  }

  getAllArticles(): void {
    this.articles$ = this.articleService.getAllArticles();
    this.sorting(this.selectedSortOption);
  }

  sorting(option: string): void {
    this.articles$ = this.articles$.pipe(
      map(articles => articles.slice().sort((a, b) => {
        const factor = option === SORT_OPTIONS[0] ? 1 : -1;
        return factor * (b.date.seconds - a.date.seconds);
      }))
    );
    this.search = false;
  }

  deleteArticle(articleId: string): void {
    this.articleService.deleteArticle(articleId).then(()=> {
      this.getAllArticles();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.searchQuerySubscription) {
      this.searchQuerySubscription.unsubscribe();
    }
  }
}
