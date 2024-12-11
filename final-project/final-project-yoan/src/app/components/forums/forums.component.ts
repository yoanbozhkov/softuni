import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { Post } from '../../types/post';
import { User } from '../../types/user';
import { UserService } from '../../user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterLink],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css',
})
export class ForumsComponent implements OnInit {
  posts: Post[] = [];
  user: User | undefined | null = undefined;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.getLatestPosts().subscribe((post) => {
      this.posts = post;
      this.user = this.userService.user;
    });
  }
}
