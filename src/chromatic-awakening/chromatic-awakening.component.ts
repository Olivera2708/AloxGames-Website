import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ScrollService} from '../scroll.service';
import {Character3dComponent} from '../character3d/character3d.component';

@Component({
  selector: 'app-chromatic-awakening',
  imports: [
    Character3dComponent
  ],
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
      const elementPosition = this.gamesElement.nativeElement.getBoundingClientRect().top + window.scrollY;
      const offset = 48;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }
}
