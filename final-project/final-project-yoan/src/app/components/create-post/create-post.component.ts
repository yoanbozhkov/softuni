import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  post = { title: '', description: '' };
  constructor(private postService: PostService, private router: Router) {}

  createPost() {
    this.postService.createPost(this.post).subscribe(() => {
      this.router.navigate(['/post']);
    });
  }
}
