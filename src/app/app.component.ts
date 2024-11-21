import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {MainPageComponent} from '../main-page/main-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MainPageComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alox Games';
}
