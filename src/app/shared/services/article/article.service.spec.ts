import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticleService } from './article.service';
import { IArticle } from '../../interfaces';
import firebase from 'firebase/compat/app';
import Timestamp = firebase.firestore.Timestamp;

describe('ArticleService', () => {
  let articleService: ArticleService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;
  let routerSpy: jasmine.SpyObj<Router>;
  let article: IArticle;
  beforeEach(() => {
    const firestoreSpyObj = jasmine.createSpyObj('AngularFirestore', ['collection', 'get']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    article = {
      title: 'title',
      category: 'category',
      text: 'text',
      imageUrl: 'strimageUrling',
      date: Timestamp.fromDate(new Date),
      userId: 'userId',
      userName: 'userName',
      userAvatar: 'userAvatar',
    };

    TestBed.configureTestingModule({
      providers: [
        ArticleService,
        { provide: AngularFirestore, useValue: firestoreSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ]
    });

    articleService = TestBed.inject(ArticleService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(articleService).toBeTruthy();
  });

  // it('should call navigate method when addArticle is called', () => {
  //   articleService.addArticle(article);
  //   expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['']);
  // });

  // it('should return an observable of articles when getAllArticles is called', () => {
  //   firestoreSpy.collection.and.returnValue({ get: () => of(article) });
  //   articleService.getAllArticles().subscribe(articles => {
  //     expect(articles).toEqual(article);
  //   });
  // });

});
