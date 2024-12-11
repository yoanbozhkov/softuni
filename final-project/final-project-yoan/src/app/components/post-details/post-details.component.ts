import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { Comment } from '../../types/comment';
import { Post } from '../../types/post';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  comments: Comment[] = [];
  post: Post = {
    title: '',
    description: '',
    _id: '',
    postCreator: {
      _id: '',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      created_at: '',
      updatedAt: '',
    },
    postComments: [],
    created_at: '',
    updatedAt: '',
  };
  deleted: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('postId') ?? '';
      if (postId) {
        forkJoin([
          this.postService.getPostById(postId),
          this.postService.getCommentsForPost(postId),
        ]).subscribe(([post, comments]) => {
          this.post = post;
          this.comments = comments;
        });
      }
    });
  }

  deleteComment(commentId: string, postId: string) {
    this.postService.deleteComment(commentId, postId).subscribe(() => {
      this.refreshComments(postId);
    });
  }

  refreshComments(postId: string) {
    this.postService.getCommentsForPost(postId).subscribe((comment) => {
      this.comments = comment;
    });
  }
}
