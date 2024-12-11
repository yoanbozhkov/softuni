import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent {
  comment = { content: '' };
  postId: string = '';
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submitComment() {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('postId') ?? '';
      if (postId) {
        this.postId = postId;
        console.log(postId);
        this.postService.createComment(this.comment, postId).subscribe(() => {
          this.router.navigate(['/post', postId, 'comments']);
        });
      }
    });
  }
}
