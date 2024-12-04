import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {ScrollService} from "../scroll.service";

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
  isNavbarHidden = false;

  constructor(private scrollService: ScrollService) {}

  // @HostListener('window:scroll', [])
  // onWindowScroll(): void {
  //   const currentScroll = window.scrollY || document.documentElement.scrollTop;
  //   this.isNavbarHidden = currentScroll <= 0;
  // }

  ngOnInit(): void {
    this.checkIfPhone();
    this.isInitialized = true;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfPhone();
  }

  private checkIfPhone() {
    this.isPhone = window.innerWidth <= 1000;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToGames(): void {
    this.scrollService.triggerScrollToGames();
  }

  scrollToAboutUs(): void {
    this.scrollService.triggerScrollToAboutUs();
  }
}
