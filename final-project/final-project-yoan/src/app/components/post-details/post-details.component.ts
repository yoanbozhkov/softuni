import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  postTitle: string = 'Sample Post Title';
  postDescription: string = 'Sample Post Title';
  comments: string[] = [
    'This is a comment.',
    "Here's another comment.",
    'I really like this post!',
  ];
}
