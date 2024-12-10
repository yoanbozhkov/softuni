import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { Comment } from '../../types/comment';
import { Post } from '../../types/post';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  comments: Comment[] = [];
  post!: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('postId') ?? '';
      if (postId) {
        this.postService.getPostById(postId).subscribe((post) => {
          this.post = post;
        });
        this.postService.getCommentsForPost(postId).subscribe((comments) => {
          this.comments = comments;
        });
      }
    });
  }
}
