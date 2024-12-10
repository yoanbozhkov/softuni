import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forums',
  standalone: true,
  imports: [CardComponent, CommonModule, RouterLink],
  templateUrl: './forums.component.html',
  styleUrl: './forums.component.css',
})
export class ForumsComponent {
  cards = [
    { title: 'Card 1', description: 'This is description 1' },
    { title: 'Card 2', description: 'This is description 2' },
    { title: 'Card 3', description: 'This is description 3' },
    { title: 'Card 4', description: 'This is description 4' },
    { title: 'Card 5', description: 'This is description 5' },
    { title: 'Card 6', description: 'This is description 6' },
    { title: 'Card 7', description: 'This is description 7' },
    { title: 'Card 8', description: 'This is description 8' },
    { title: 'Card 9', description: 'This is description 9' },
  ];
}
