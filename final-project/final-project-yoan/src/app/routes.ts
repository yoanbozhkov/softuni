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

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  // {
  //   path: 'post',
  //   children: [
  //     { path: '', component: ForumsComponent },
  //     {
  //       path: ':postId/comments',
  //       component: PostDetailsComponent,
  //     },
  //   ],
  // },
  {
    path: 'post',
    children: [
      { path: '', component: ForumsComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: ':postId/edit-post', component: EditPostComponent },
      { path: ':postId/comments', component: PostDetailsComponent },
      {
        path: ':postId/comments/create-comment',
        component: CreateCommentComponent,
      },
      {
        path: ':postId/comments/:commentId/edit-comment',
        component: EditCommentComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // { path: 'create-post', component: CreatePostComponent },
  // { path: 'create-comment', component: CreateCommentComponent },
  { path: '**', redirectTo: 'home' },
];
