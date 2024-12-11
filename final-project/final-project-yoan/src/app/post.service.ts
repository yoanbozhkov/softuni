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

  private readonly apiUrl = 'http://localhost:5000/api/posts';

  getLatestPosts() {
    return this.http.get<Post[]>(`${this.apiUrl}/latest`);
  }

  getCommentsForPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  getCommentById(commentId: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/comment/${commentId}`);
  }

  deletePostById(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }

  deleteComment(commentId: string, postId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${postId}/comments/${commentId}`
    );
  }

  createPost(post: { title: string; description: string }): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  createComment(
    comment: { content: string },
    postId: string
  ): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${postId}/comment`, comment);
  }

  updatePost(
    postId: string,
    post: { title: string; description: string }
  ): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}`, post);
  }

  updateComment(
    commentId: string,
    comment: { content: string }
  ): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/comments/${commentId}`, comment);
  }
}
