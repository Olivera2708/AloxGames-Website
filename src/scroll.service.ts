import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollToGamesSource = new Subject<void>();
  scrollToGames$ = this.scrollToGamesSource.asObservable();

  triggerScrollToGames() {
    this.scrollToGamesSource.next();
  }
}
