import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TermsPolicyPageComponent } from './pages/terms-policy-page/terms-policy-page.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { authGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './pages/main/components/dashboard/dashboard.component';
import { AddNewArticleComponent } from './pages/main/components/add-new-article/add-new-article.component';
import { AccountComponent } from './pages/main/components/account/account.component';
import { ArticleComponent } from './pages/main/components/article/article.component';
import { EditArticleComponent } from './pages/main/components/edit-article/edit-article.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent
  },
  {
    path: 'terms',
    component: TermsPolicyPageComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'account', component: AccountComponent },
      { path: 'article/:id', component: ArticleComponent },
      { path: 'add-new-article', component: AddNewArticleComponent },
      { path: 'edit-article/:id', component: EditArticleComponent },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
