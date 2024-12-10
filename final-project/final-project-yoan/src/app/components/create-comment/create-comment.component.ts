import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent {}
