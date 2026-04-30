import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <!-- Custom Cursor -->
    <div class="cursor-dot" [style.left.px]="cx" [style.top.px]="cy"></div>
    <div class="cursor-outline" [style.left.px]="ox" [style.top.px]="oy"></div>

    <!-- Premium Navigation -->
    <nav class="fixed top-0 left-0 w-full [h-0px] z-50 py-0 px-8 lg:px-0 transition-all duration-500 bg-white shadow-sm"
         [class.bg-white/95]="scrolled" [class.backdrop-blur-xl]="scrolled" [class.shadow-xl]="scrolled" [class.border-b]="scrolled"
         [class.border-orange-100]="scrolled" id="mainNav">
      <div class="max-w-7xl mx-auto flex justify-between items-center">

       <a routerLink="/" class="flex items-center gap-2 no-underline overflow-hidden h-[100px]">
  <img [src]="'assets/img/ndi-logo.png'" alt="NDI Logo" class="h-30 w-auto">
</a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex gap-10 font-medium items-center text-gray-700 transition-colors duration-500">
          <a routerLink="/about" routerLinkActive="!text-orange-600" class="hover:text-orange-600 transition no-underline">About</a>
          <a routerLink="/services" routerLinkActive="!text-orange-600" class="hover:text-orange-600 transition no-underline">Services</a>
          <a routerLink="/solutions" routerLinkActive="!text-orange-600" class="hover:text-orange-600 transition no-underline">Solutions</a>
          <a routerLink="/products" routerLinkActive="!text-orange-600" class="hover:text-orange-600 transition no-underline">Products</a>
          <a routerLink="/portfolio" routerLinkActive="!text-orange-600" class="hover:text-orange-600 transition no-underline">Portfolio</a>

          <!-- Technologies Dropdown -->
          <div class="ndi-dropdown relative">
            <a routerLink="/technologies" class="hover:text-orange-600 transition flex items-center gap-1 no-underline text-gray-700">
              Technologies <i class="fas fa-chevron-down text-xs"></i>
            </a>
            <div class="ndi-dropdown-content absolute top-full left-0 bg-white min-w-72 shadow-2xl rounded-xl border border-orange-100 z-50 mt-2">
              <a routerLink="/technologies/angular" class="ndi-dropdown-item" (click)="mobileOpen=false">
                <i class="fab fa-angular text-red-600"></i><span>Angular</span>
                <span class="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">Frontend</span>
              </a>
              <a routerLink="/technologies/react" class="ndi-dropdown-item" (click)="mobileOpen=false">
                <i class="fab fa-react text-blue-500"></i><span>React</span>
                <span class="ml-auto text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">Frontend</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fab fa-node-js text-green-600"></i><span>Node.js</span>
                <span class="ml-auto text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">Backend</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fab fa-python text-blue-500"></i><span>Python</span>
                <span class="ml-auto text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">Backend</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fab fa-microsoft text-blue-700"></i><span>.NET</span>
                <span class="ml-auto text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">Backend</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fas fa-database text-orange-500"></i><span>SQL</span>
                <span class="ml-auto text-xs bg-yellow-600 text-white px-2 py-0.5 rounded-full font-semibold">Database</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fab fa-aws text-orange-400"></i><span>AWS</span>
                <span class="ml-auto text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-semibold">Cloud</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fab fa-docker text-blue-400"></i><span>Docker</span>
                <span class="ml-auto text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold">DevOps</span>
              </a>
              <a href="#" class="ndi-dropdown-item">
                <i class="fab fa-git-alt text-orange-600"></i><span>Git</span>
                <span class="ml-auto text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-semibold">DevOps</span>
              </a>
            </div>
          </div>

          <a routerLink="/contact" routerLinkActive="!text-orange-600" class="hover:text-orange-600 transition no-underline">Contact</a>
        </div>

        <!-- Social Icons + Mobile toggle -->
        <div class="flex items-center gap-6">
          <div class="hidden md:flex items-center gap-3">
            <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm">
              <i class="fab fa-facebook-f text-sm"></i>
            </a>
            <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm">
              <i class="fab fa-linkedin-in text-sm"></i>
            </a>
            <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-[#E4405F] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm">
              <i class="fab fa-instagram text-sm"></i>
            </a>
            <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm">
              <i class="fab fa-youtube text-sm"></i>
            </a>
          </div>
          <button class="md:hidden text-2xl text-gray-700 bg-transparent border-0 cursor-pointer p-1"
                  (click)="mobileOpen = !mobileOpen" aria-label="Toggle menu">
            <i [class]="mobileOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (mobileOpen) {
        <div class="md:hidden mt-4 pb-6 border-t border-orange-100 pt-6 flex flex-col gap-2 bg-white/95 backdrop-blur-xl animate-fade-in">
          <a routerLink="/" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Home</a>
          <a routerLink="/about" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">About</a>
          <a routerLink="/services" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Services</a>
          <a routerLink="/solutions" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Solutions</a>
          <a routerLink="/products" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Products</a>
          <a routerLink="/portfolio" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Portfolio</a>
          <a routerLink="/technologies" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Technologies</a>
          <a routerLink="/contact" class="px-6 py-3 text-lg font-bold text-gray-800 hover:text-orange-600 transition no-underline" (click)="mobileOpen=false">Contact</a>
          
          <!-- Mobile Social Bar -->
          <div class="mt-8 mx-6 p-4 bg-gray-50 rounded-2xl flex justify-center gap-6 items-center border border-gray-100">
            <a href="#" target="_blank" class="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md">
              <i class="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" target="_blank" class="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center text-white shadow-md">
              <i class="fab fa-linkedin-in text-xl"></i>
            </a>
            <a href="#" target="_blank" class="w-12 h-12 rounded-full bg-[#E4405F] flex items-center justify-center text-white shadow-md">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" target="_blank" class="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md">
              <i class="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      }
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .ndi-dropdown-content { display: none; }
    .ndi-dropdown:hover .ndi-dropdown-content { display: block; }
    .ndi-dropdown-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 18px; color: #374151; text-decoration: none;
      transition: all .25s; border-bottom: 1px solid rgba(250,165,6,.1);
      font-size: .9rem;
    }
    .ndi-dropdown-item:last-child { border-bottom: none; }
    .ndi-dropdown-item:hover { background: linear-gradient(135deg,rgba(250,165,6,.08),rgba(34,197,94,.08)); color:#faa506; padding-left:22px; }
    .ndi-dropdown-item i { width: 20px; text-align: center; flex-shrink: 0; }
  `],
})
export class SiteHeaderComponent {
  scrolled = false;
  mobileOpen = false;
  cx = -100; cy = -100;
  ox = -100; oy = -100;

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 30; }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.cx = e.clientX - 4;
    this.cy = e.clientY - 4;
    setTimeout(() => { this.ox = e.clientX - 20; this.oy = e.clientY - 20; }, 80);
  }
}


























