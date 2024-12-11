import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutComponent } from './components/about/about.component';
import { ForumsComponent } from './components/forums/forums.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { ProfileComponent } from './my-profile/my-profile.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'post',
    children: [
      { path: '', component: ForumsComponent },
      {
        path: 'create-post',
        component: CreatePostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':postId/edit-post',
        component: EditPostComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':postId/comments',
        component: PostDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':postId/comments/create-comment',
        component: CreateCommentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':postId/comments/:commentId/edit-comment',
        component: EditCommentComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];
