import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AVATAR } from '../../shared/consts';
import { IUserData } from '../../shared/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleService } from '../../shared/services/article/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  protected readonly AVATAR = AVATAR;
  userName: string = '';
  searchText: string = '';
  user!: IUserData;

  constructor(private auth: AuthService, private articleService: ArticleService, private router: Router) {
    this.getUserData();
  }

  getUserData(): void {
    this.auth.user$
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.userName = (user.firstName ? user.firstName : '') + (user.lastName ? ' ' + user.lastName : '');
        }
      });
  }

  logout(): void {
    this.auth.signOut();
  }

  search(): void {
    this.articleService.setSearchQuery(this.searchText);
    this.router.navigate(['/']);
  }
}
