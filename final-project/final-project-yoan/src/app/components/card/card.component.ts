import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../types/post';
import { User } from '../../types/user';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  deleted: boolean = false;
  @Input()
  post!: Post;

  @Input()
  user: User | undefined | null;

  deletePost(postId: string) {
    this.postService.deletePostById(postId).subscribe(() => {
      this.deleted = true;
      this.router
        .navigateByUrl('/refresh', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/post']);
        });
    });
  }
}
