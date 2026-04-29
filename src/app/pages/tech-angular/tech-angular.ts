// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-tech-angular',
  standalone: true,
  imports: [],
  templateUrl: './tech-angular.html',
  styleUrl: './tech-angular.css',
})
export class TechAngularComponent implements AfterViewInit, OnDestroy {
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
      
              // GSAP Animations
              gsap.registerPlugin(ScrollTrigger);
              
              // Hero animations
              gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
              gsap.fromTo("p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              
              // Feature cards animation
              gsap.utils.toArray(".feature-card").forEach((card, i) => {
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
      console.error('Error initializing scripts for tech-angular', e);
    }
  }
}

