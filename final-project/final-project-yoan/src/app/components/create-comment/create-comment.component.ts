import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent implements OnInit {
  comment = { content: '' };
  postId: string = '';
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('postId') ?? '';
      if (postId) {
        this.postId = postId;
      }
    });
  }

  submitComment() {
    this.postService.createComment(this.comment, this.postId).subscribe(() => {
      this.router.navigate(['/post', this.postId, 'comments']);
    });
  }
}
