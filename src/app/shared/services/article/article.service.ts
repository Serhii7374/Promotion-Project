import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IArticle, IUserData } from '../../interfaces';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay } from 'rxjs';
import { convertSnaps } from '../../db-utils';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();

  private cachedAllArticles$!: Observable<IArticle[]>;
  private cachedMyArticles$!: Observable<IArticle[]>;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  addArticle(article: IArticle): void {
    this.firestore.collection('articles').add(article)
      .then(()=> {
        this.router.navigate(['']);
      });
  }

  getAllArticles(): Observable<IArticle[]> {
    if (!this.cachedAllArticles$ || navigator.onLine) {
      this.cachedAllArticles$ = this.firestore.collection('articles')
        .get()
        .pipe(
          map(result => convertSnaps<IArticle>(result)),
          shareReplay(1),
          catchError((error) => {
            console.error('Error fetching articles:', error);
            return of([]);
          })
        );
    }

    return this.cachedAllArticles$;
  }

  getArticles(uid: string): Observable<IArticle[]> {
    if (!this.cachedMyArticles$ || navigator.onLine) {
      this.cachedMyArticles$ = this.firestore.collection('articles', ref => ref
        .where('userId', '==', uid))
        .get()
        .pipe(
          map(result => convertSnaps<IArticle>(result)),
          shareReplay(1),
          catchError((error) => {
            console.error('Error fetching articles:', error);
            return of([]);
          })
        );
    }
    return this.cachedMyArticles$;
  }

  getArticlesByCategory(category: string): Observable<IArticle[]> {
    return this.firestore.collection('articles', ref => ref
      .where('category', '==', category))
      .get()
      .pipe(
        map(result => convertSnaps<IArticle>(result)),
        shareReplay(1),
        catchError((error) => {
          console.error('Error fetching articles:', error);
          return of([]);
        })
      );
  }

  getArticlesById(id: string): Observable<IArticle> {
    return this.firestore.collection('articles').doc(id)
      .get()
      .pipe(
        map(result => result.data() as IArticle),
        shareReplay(1),
        catchError((error) => {
          console.error('Error fetching article:', error);
          return of();
        })
      );
  }

  updateArticle(id: string, article: IArticle): Promise<void> {
    return this.firestore.collection('articles').doc(id).update(article);
  }

  deleteArticle(id: string): Promise<void> {
    return this.firestore.collection('articles').doc(id).delete();
  }
}
