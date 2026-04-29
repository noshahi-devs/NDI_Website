// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-about-premium',
  standalone: true,
  imports: [],
  templateUrl: './about-premium.html',
  styleUrl: './about-premium.css',
})
export class AboutPremiumComponent implements AfterViewInit, OnDestroy {
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
          const cursorDot = document.querySelector('.cursor-dot');
          const cursorOutline = document.querySelector('.cursor-outline');
          document.addEventListener('mousemove', (e) => {
            cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
          });
          document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => { cursorOutline.style.transform = `scale(1.5)`; cursorOutline.style.borderColor = 'orange'; });
            el.addEventListener('mouseleave', () => { cursorOutline.style.transform = `scale(1)`; cursorOutline.style.borderColor = 'rgba(250, 165, 6, 0.5)'; });
          });
          
          // Navbar scroll effect
          window.addEventListener('scroll', () => {
            const nav = document.getElementById('mainNav');
            if (window.scrollY > 50) nav.classList.add('shadow-md');
            else nav.classList.remove('shadow-md');
          });
          
          // GSAP Animations
          gsap.registerPlugin(ScrollTrigger);
          
          // Hero animations
          gsap.fromTo(".section-title", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1)", delay: 0.2 });
          gsap.fromTo(".text-xl.text-gray-300", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
          
          // Scroll-triggered animations
          gsap.utils.toArray(".glass-premium").forEach((card, i) => {
            gsap.fromTo(card, { y: 50, opacity: 0 }, { 
              y: 0, 
              opacity: 1, 
              duration: 0.7, 
              scrollTrigger: { 
                trigger: card, 
                start: "top 85%", 
                toggleActions: "play none none reverse" 
              }, 
              delay: i * 0.1 
            });
          });
          
          // Form submission
          document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✨ Thank you for your interest! Our team will contact you within 24 hours.');
            e.target.reset();
          });
          
          // Button interactions
          document.querySelectorAll('.btn-glow, button').forEach(btn => {
            btn.addEventListener('click', () => { 
              if (!btn.closest('form')) {
                alert('🚀 Welcome to Noshahi Developers — schedule your personalized consultation!');
              }
            });
          });
        
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for about-premium', e);
    }
  }
}

