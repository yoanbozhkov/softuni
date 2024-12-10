import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
