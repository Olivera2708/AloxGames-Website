import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {ChromaticAwakeningComponent} from '../chromatic-awakening/chromatic-awakening.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MainPageComponent, ChromaticAwakeningComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alox Games';
}
