import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './types/comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getLatestPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts/latest');
  }

  getCommentsForPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`/api/posts/${postId}/comments`);
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`/api/posts/${postId}`);
  }

  getCommentById(commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`/api/posts/comment/${commentId}`);
  }

  deletePostById(postId: string): Observable<void> {
    return this.http.delete<void>(`/api/posts/${postId}`);
  }

  deleteComment(commentId: string, postId: string): Observable<void> {
    return this.http.delete<void>(`/api/posts/${postId}/comments/${commentId}`);
  }

  createPost(post: { title: string; description: string }): Observable<Post> {
    return this.http.post<Post>('/api/posts', post);
  }

  createComment(
    comment: { content: string },
    postId: string
  ): Observable<Comment> {
    return this.http.post<Comment>(`/api/posts/${postId}/comment`, comment);
  }

  updatePost(
    postId: string,
    post: { title: string; description: string }
  ): Observable<Post> {
    return this.http.put<Post>(`/api/posts/${postId}`, post);
  }

  updateComment(
    commentId: string,
    comment: { content: string }
  ): Observable<Comment> {
    return this.http.put<Comment>(`/api/posts/comments/${commentId}`, comment);
  }
}
