import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../types/post';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
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

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('postId') ?? '';
      if (postId) {
        this.postService.getPostById(postId).subscribe((post) => {
          this.post = post;
        });
      }
    });
  }

  updatePost(postId: string) {
    this.postService.updatePost(postId, this.post).subscribe();
    this.router.navigate(['/post']);
  }
}
