import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToGamesSource = new Subject<void>();
  private scrollToAboutUsSource = new Subject<void>();
  scrollToGames$ = this.scrollToGamesSource.asObservable();
  scrollToAboutUs$ = this.scrollToAboutUsSource.asObservable();

  triggerScrollToGames() {
    this.scrollToGamesSource.next();
  }

  triggerScrollToAboutUs() {
    this.scrollToAboutUsSource.next();
  }
}
