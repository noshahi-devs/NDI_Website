// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
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
            el.addEventListener('mouseleave', () => { cursorOutline.style.transform = `scale(1)`; cursorOutline.style.borderColor = 'rgba(79, 70, 229, 0.4)'; });
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
          gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
          gsap.fromTo("p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
          
          // Scroll-triggered animations (Excluding Hero)
          gsap.utils.toArray(".group").forEach((item, i) => {
            // Skip the hero section which also uses the 'group' class for hover effects
            if (item.closest('section') === item && i === 0) return;
            
            gsap.fromTo(item, { y: 50, opacity: 0 }, { 
              y: 0, 
              opacity: 1, 
              duration: 0.7, 
              scrollTrigger: { 
                trigger: item, 
                start: "top 85%", 
                toggleActions: "play none none reverse" 
              }, 
              delay: i * 0.1 
            });
          });
          
          // Enterprise section animations
          gsap.fromTo("#enterprise-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#enterprise-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // Services section animations
          gsap.fromTo("#services-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#services-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // Dedicated teams section animations
          gsap.fromTo("#dedicated-teams-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#dedicated-teams-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // Mobile app section animations
          gsap.fromTo("#mobile-app-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#mobile-app-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // Advisory section animations
          gsap.fromTo("#advisory-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#advisory-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // QA/Testing section animations
          gsap.fromTo("#qa-testing-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#qa-testing-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // Testimonials section animations
          gsap.fromTo("#testimonials-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#testimonials-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
          
          // Contact section animations
          gsap.fromTo("#contact-section .group", { y: 50, opacity: 0 }, { 
            y: 0, 
            opacity: 1, 
            duration: 0.7, 
            scrollTrigger: { 
              trigger: "#contact-section", 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            }
          });
        
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for services', e);
    }
  }
}

