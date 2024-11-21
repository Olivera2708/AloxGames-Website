import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ScrollService} from '../scroll.service';

@Component({
  selector: 'app-chromatic-awakening',
  imports: [],
  templateUrl: './chromatic-awakening.component.html',
  standalone: true,
  styleUrl: './chromatic-awakening.component.css'
})
export class ChromaticAwakeningComponent implements AfterViewInit{
  @ViewChild('games') gamesElement!: ElementRef;

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit(): void {
    this.scrollService.scrollToGames$.subscribe(() => {
      this.scrollToGames();
    });
  }

  scrollToGames(): void {
    if (this.gamesElement) {
      this.gamesElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
