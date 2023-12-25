import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { Observable } from 'rxjs';
import { IArticle } from '../../../../shared/interfaces';
import { DEFAULT_BACKGROUND } from '../../../../shared/consts';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  protected readonly DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;
  articleId!: string;
  article$!: Observable<IArticle>;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getArticleId();
    this.getArticle();
  }

  getArticleId(): void {
    this.articleId = this.route.snapshot.params['id'];
  }

  getArticle(): void {
    this.article$ = this.articleService.getArticlesById(this.articleId);
  }
}
