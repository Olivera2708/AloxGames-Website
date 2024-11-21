import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ScrollService} from '../scroll.service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  standalone: true,
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements AfterViewInit {
  @ViewChild('about') gamesElement!: ElementRef;

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit(): void {
    this.scrollService.scrollToAboutUs$.subscribe(() => {
      this.scrollToAboutUs();
    });
  }

  scrollToAboutUs(): void {
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
