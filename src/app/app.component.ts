import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {ChromaticAwakeningComponent} from '../chromatic-awakening/chromatic-awakening.component';
import {AboutUsComponent} from '../about-us/about-us.component';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MainPageComponent, ChromaticAwakeningComponent, AboutUsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Alox Games';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-QNRTJRHBJK', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
