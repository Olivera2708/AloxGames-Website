import { Component, HostListener, OnInit } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  imports: [NgIf, NgClass],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen: boolean = false;
  isPhone = false;
  isInitialized: boolean = false;

  ngOnInit(): void {
    this.checkIfPhone();
    this.isInitialized = true;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfPhone();
  }

  private checkIfPhone() {
    this.isPhone = window.innerWidth <= 768;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
