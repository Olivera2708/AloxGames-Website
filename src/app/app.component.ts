import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {ChromaticAwakeningComponent} from '../chromatic-awakening/chromatic-awakening.component';
import {AboutUsComponent} from '../about-us/about-us.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MainPageComponent, ChromaticAwakeningComponent, AboutUsComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Alox Games';
}
