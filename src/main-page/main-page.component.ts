import { Component } from '@angular/core';
import {ScrollService} from '../scroll.service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  constructor(private scrollService: ScrollService) {}

  ScrollToGames() {
    this.scrollService.triggerScrollToGames();
  }
}
