import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../types/post';

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterLink],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css',
})
export class ForumsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getLatestPosts().subscribe((latestPosts) => {
      this.posts = latestPosts;
    });
  }
}
