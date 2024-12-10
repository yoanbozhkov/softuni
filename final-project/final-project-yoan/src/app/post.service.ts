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
}
