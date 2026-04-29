// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [],
  templateUrl: './technologies.html',
  styleUrl: './technologies.css',
})
export class TechnologiesComponent implements AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScripts();
    }
  }
  
  ngOnDestroy(): void {
      if (isPlatformBrowser(this.platformId) && typeof ScrollTrigger !== 'undefined') {
          // Kill all scroll triggers to prevent memory leaks when navigating between pages
          ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
  }

  initScripts() {
    try {
      setTimeout(() => {
      
              // Custom Cursor
              const cursor = document.querySelector('.cursor-dot');
              const cursorOutline = document.querySelector('.cursor-outline');
              
              document.addEventListener('mousemove', (e) => {
                  cursor.style.left = e.clientX + 'px';
                  cursor.style.top = e.clientY + 'px';
                  
                  cursorOutline.style.left = e.clientX + 'px';
                  cursorOutline.style.top = e.clientY + 'px';
              });
              
              document.addEventListener('mousedown', () => {
                  cursor.style.transform = 'scale(0.8)';
                  cursorOutline.style.transform = 'scale(0.8)';
              });
              
              document.addEventListener('mouseup', () => {
                  cursor.style.transform = 'scale(1)';
                  cursorOutline.style.transform = 'scale(1)';
              });
              
              // Navigation Scroll Effect
              window.addEventListener('scroll', () => {
                  const nav = document.getElementById('mainNav');
                  if (window.scrollY > 50) {
                      nav.classList.add('shadow-lg');
                  } else {
                      nav.classList.remove('shadow-lg');
                  }
              });
              
              // GSAP Animations
              gsap.registerPlugin(ScrollTrigger);
              
              // Hero animations
              gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
              gsap.fromTo("p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              
              // Tech cards animation
              gsap.utils.toArray(".tech-card").forEach((card, i) => {
                  gsap.fromTo(card, { y: 100, opacity: 0, scale: 0.8 }, { 
                      y: 0, 
                      opacity: 1, 
                      scale: 1, 
                      duration: 0.8, 
                      scrollTrigger: { 
                          trigger: card, 
                          start: "top 80%", 
                          toggleActions: "play none none reverse" 
                      }, 
                      delay: i * 0.1 
                  });
              });
          
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for technologies', e);
    }
  }
}

