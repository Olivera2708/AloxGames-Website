import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ScrollService} from '../scroll.service';
import {NgForOf, NgStyle} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-chromatic-awakening',
  imports: [
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
      image: 'assets/volcano.png',
      title: 'Volcanic Region',
      description: `Step into a volcanic region where molten rivers carve paths through a barren, ash-covered terrain. Towering spires of obsidian rise against a sky painted in hues of fiery red and orange, with the air shimmering under the intense heat.<br><br>
        Amidst this unforgiving environment, challenges await. Navigate treacherous paths, solve puzzles amidst steaming fissures, and uncover remnants of a forgotten past.<br><br>
        Restore the <span style="color: #e64141;">red color</span> to reveal hidden secrets and breathe life back into a world consumed by fire.`,
      color: '#d66868'
    },
    {
      image: 'assets/desert.png',
      title: 'Desert Dunes',
      description: `Traverse the endless expanse of desert dunes, where golden sands stretch as far as the eye can see. The sun blazes high above, and whispers of the wind carve shifting patterns in the sand.<br><br>
        Among the barren dunes lie hidden puzzles and secrets buried beneath the surface, waiting to be uncovered. Each challenge brings you closer to unearthing the mysteries of this vast desert.<br><br>
        Restore the <span style="color: #e6b741;">yellow color</span> to transform the lifeless sands into a vibrant oasis teeming with life and wonder.`,
      color: '#e8c561'
    },
    {
      image: 'assets/tropical.png',
      title: 'Tropical Rainforest',
      description: `Immerse yourself in a tropical rainforest teeming with life, where vibrant foliage and cascading waterfalls create a scene of unparalleled beauty. The air is alive with the sounds of exotic birds and distant thunder.<br><br>
        Hidden within this lush paradise are secrets and challenges waiting to be discovered. Solve puzzles nestled among the vines and rivers to unlock the rainforest's hidden treasures.<br><br>
        Restore the <span style="color: #e68041;">orange color</span> to awaken the vibrant ecosystem, breathing life into every tree, river, and creature within this tropical haven.`,
      color: '#dd945b'
    },
    {
      image: 'assets/forest.png',
      title: 'Ancient Forest',
      description: `Step into an ancient forest where towering oaks and lush undergrowth create a canopy of green serenity. Rays of sunlight pierce through the leaves, illuminating hidden trails and forgotten clearings.<br><br>
        As you explore, uncover puzzles woven into the very fabric of the forest. Solve them to unlock the forest's mysteries and restore its vibrant essence.<br><br>
        Restore the <span style="color: #3bca46;">green color</span> to rejuvenate the forest, bringing it to life with thriving plants and animals, transforming it into a sanctuary of growth and harmony.`,
      color: '#348c3d'
    },
    {
      image: 'assets/mountain.png',
      title: 'Alpine Mountains',
      description: `Step into an alpine forest where snow blankets the landscape, creating a tranquil, wintry paradise. The towering pines are heavy with frost, and the silence is broken only by the soft crunch of snow beneath your feet.<br><br>
        Amidst the frozen stillness, your task is to restore life. Solve puzzles hidden beneath the snow, unlocking the flow of life in this frozen realm.<br><br>
        Restore the <span style="color: #41d8e6;">blue color</span> to melt the snow, revealing flowing rivers and breathing life back into a world once trapped in ice.`,
      color: '#7bbcd5'
    },
    {
      image: 'assets/marine.png',
      title: 'Marine Depths',
      description: `Dive into the heart of an underwater world, where vibrant coral reefs and shimmering schools of fish create a mesmerizing spectacle. The water glistens with sunlight, revealing the hidden wonders of the deep.<br><br>
        Explore the marine depths to uncover puzzles and secrets hidden among the coral. As you progress, the true beauty of the ocean comes into focus.<br><br>
        Restore the <span style="color: #f17cc2;">pink color</span> to revive the underwater world, bringing coral reefs and marine life back to their former splendor.`,
      color: '#da84b0'
    },
    {
      image: 'assets/mystic.png',
      title: 'Mystic Forest',
      description: `Enter the depths of a mystic forest where towering trees draped in shimmering moss stand against the ethereal glow of twilight. The air is thick with the scent of damp earth and ancient magic, while a faint purple energy pulses through the canopy.<br><br>
        Venture deeper into this enchanted realm, uncovering forgotten paths and hidden wonders. To unlock its secrets, you must restore the lost purple hue that once flowed through its veins.<br><br>
        Bring the <span style="color: #c75ff1;">purple color</span> back to life, revealing the true magic that has slumbered in the shadows, and watch as the forest comes alive once more.`,
      color: '#997bd5'
    }
  ];

  currentIndex = 0;
  interval: any;
  startTouch: number = 0;
  isMouseDown: boolean = false;
  startMouseX: number = 0;
  isMac = false;

  constructor(private scrollService: ScrollService, private sanitizer: DomSanitizer) {}

  get safeDescription() {
    return this.sanitizer.bypassSecurityTrustHtml(this.items[this.currentIndex].description);
  }

  ngOnInit(): void {
    this.isMac = navigator.platform.toLowerCase().includes('mac');
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
    this.stopAutoSlide();
  }

  onTouchEnd(event: TouchEvent): void {
    const endTouch = event.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (this.startTouch - endTouch > swipeThreshold) {
      this.nextSlide();
    } else if (endTouch - this.startTouch > swipeThreshold) {
      this.previousSlide();
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.startMouseX = event.clientX;
    this.stopAutoSlide();
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isMouseDown) return;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;
    const endMouseX = event.clientX;
    this.handleSwipe(this.startMouseX, endMouseX);
  }

  handleSwipe(start: number, end: number): void {
    const swipeThreshold = 50;

    if (start - end > swipeThreshold) {
      this.nextSlide();
    } else if (end - start > swipeThreshold) {
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
