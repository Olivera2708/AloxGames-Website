import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScrollService} from '../scroll.service';
import {Character3dComponent} from '../character3d/character3d.component';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-chromatic-awakening',
  imports: [
    Character3dComponent,
    NgForOf,
    NgStyle
  ],
  templateUrl: './chromatic-awakening.component.html',
  standalone: true,
  styleUrl: './chromatic-awakening.component.css'
})
export class ChromaticAwakeningComponent implements AfterViewInit, OnInit{
  @ViewChild('games') gamesElement!: ElementRef;
  items = [
      {
          image: 'assets/volcano.jpg',
          title: 'Volcanic Region',
          description: `Step into a volcanic region where molten rivers carve paths through a barren, ash-covered terrain. Towering spires of obsidian rise against a sky painted in hues of fiery red and orange, with the air shimmering under the intense heat.<br><br>
Amidst this unforgiving environment, challenges await. Navigate treacherous paths, solve puzzles amidst steaming fissures, and uncover remnants of a forgotten past.<br><br>Restore the vibrant red color to reveal hidden secrets and breathe life back into a world consumed by fire.`,
          color: '#d66868'
      },
      {
        image: 'assets/alpines.jpg',
        title: 'Alpine Mountains',
        description: `Step into an alpine forest where snow blankets the landscape, creating a tranquil, wintry paradise. The towering pines are heavy with frost, and the silence is broken only by the soft crunch of snow beneath your feet.<br><br>Amidst the frozen stillness, your task is to restore life. Solve puzzles hidden beneath the snow, unlocking the flow of life in this frozen realm.<br><br>Restore the blue color to melt the snow, revealing flowing rivers and breathing life back into a world once trapped in ice.`,
        color: '#7bbcd5'
      },
      {
        image: 'assets/mystic.jpg',
        title: 'Mystic Forest',
        description: `Enter the depths of a mystic forest where towering trees draped in shimmering moss stand against the ethereal glow of twilight. The air is thick with the scent of damp earth and ancient magic, while a faint purple energy pulses through the canopy.<br><br>Venture deeper into this enchanted realm, uncovering forgotten paths and hidden wonders. To unlock its secrets, you must restore the lost purple hue that once flowed through its veins.<br><br>Bring the purple color back to life, revealing the true magic that has slumbered in the shadows, and watch as the forest comes alive once more.`,
        color: '#997bd5',
      }
  ];

  currentIndex = 0;
  interval: any;
  startTouch: number = 0;

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
      this.startAutoSlide();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }, 10000);
  }

  stopAutoSlide(): void {
    clearInterval(this.interval);
  }

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

  onTouchStart(event: TouchEvent): void {
    this.startTouch = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const endTouch = event.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (this.startTouch - endTouch > swipeThreshold) {
      this.nextSlide();
    } else if (endTouch - this.startTouch > swipeThreshold) {
      this.previousSlide();
    }
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
}
