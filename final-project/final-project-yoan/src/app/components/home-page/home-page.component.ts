import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
