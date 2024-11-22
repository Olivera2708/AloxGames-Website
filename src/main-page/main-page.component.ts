import {AfterViewInit, Component} from '@angular/core';
import {ScrollService} from '../scroll.service';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements AfterViewInit {
  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit() {
    const videoElement = document.getElementById('background-video') as HTMLVideoElement;

    if (videoElement) {
      setTimeout(() => {
        videoElement.play()
          .then(() => {
            console.log('Video started playing');
          })
          .catch((error) => {
            console.error('Error playing video:', error);
          });
      }, 500);
    }
  }

  ScrollToGames() {
    this.scrollService.triggerScrollToGames();
  }
}
