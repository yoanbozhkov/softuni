import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../post.service';
import { FormsModule } from '@angular/forms';
import { Comment } from '../types/comment';
@Component({
  selector: 'app-edit-comment',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-comment.component.html',
  styleUrl: './edit-comment.component.css',
})
export class EditCommentComponent implements OnInit {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  comment: Comment = {
    _id: '',
    content: '',
    commentCreator: '',
    commentForPost: {
      _id: '',
      title: '',
      description: '',
      postCreator: '',
      postComments: [],
      created_at: '',
      updatedAt: '',
    },
    created_at: '',
    updatedAt: '',
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const commentId = params.get('commentId') ?? '';
      if (commentId) {
        this.postService.getCommentById(commentId).subscribe((comment) => {
          this.comment = comment;
        });
      }
    });
  }

  updateComment(commentId: string) {
    this.postService.updateComment(commentId, this.comment).subscribe();
    this.router.navigate(['/post', this.comment.commentForPost, 'comments']);
  }
}
