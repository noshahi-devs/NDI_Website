// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [],
  templateUrl: './solutions.html',
  styleUrl: './solutions.css',
})
export class SolutionsComponent implements AfterViewInit, OnDestroy {
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
              
              // Solution cards animation
              gsap.utils.toArray(".card-3d").forEach((card, i) => {
                  gsap.fromTo(card, { y: 100, opacity: 0, rotationY: -15 }, { 
                      y: 0, 
                      opacity: 1, 
                      rotationY: 0, 
                      duration: 1, 
                      scrollTrigger: { 
                          trigger: card, 
                          start: "top 80%", 
                          toggleActions: "play none none reverse" 
                      }, 
                      delay: i * 0.1 
                  });
              });
              
              // Contact Form Validation and Submission
              const contactForm = document.getElementById('contactForm');
              
              if (contactForm) {
                  contactForm.addEventListener('submit', function(e) {
                      e.preventDefault();
                      
                      // Get form values
                      const formData = new FormData(contactForm);
                      const firstName = formData.get('firstName') || contactForm.querySelector('input[type="text"]').value;
                      const lastName = formData.get('lastName') || contactForm.querySelectorAll('input[type="text"]')[1].value;
                      const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
                      const phone = formData.get('phone') || contactForm.querySelector('input[type="tel"]').value;
                      const company = formData.get('company') || contactForm.querySelector('input[placeholder*="Company"]').value;
                      const solutionType = formData.get('solutionType') || contactForm.querySelector('select').value;
                      const message = formData.get('message') || contactForm.querySelector('textarea').value;
                      const budget = formData.get('budget');
                      
                      // Basic validation
                      if (!firstName || !lastName || !email || !phone || !company || !solutionType || !message) {
                          showNotification('Please fill in all required fields', 'error');
                          return;
                      }
                      
                      // Email validation
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(email)) {
                          showNotification('Please enter a valid email address', 'error');
                          return;
                      }
                      
                      // Phone validation
                      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                      if (!phoneRegex.test(phone)) {
                          showNotification('Please enter a valid phone number', 'error');
                          return;
                      }
                      
                      // Show success message
                      showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                      
                      // Reset form
                      contactForm.reset();
                      
                      // Animate form reset
                      gsap.fromTo(contactForm, { scale: 0.98, opacity: 0.8 }, { 
                          scale: 1, 
                          opacity: 1, 
                          duration: 0.3, 
                          ease: "power2.out" 
                      });
                  });
              }
              
              // Notification function
              function showNotification(message, type = 'success') {
                  // Remove existing notifications
                  const existingNotification = document.querySelector('.notification');
                  if (existingNotification) {
                      existingNotification.remove();
                  }
                  
                  // Create notification element
                  const notification = document.createElement('div');
                  notification.className = `notification fixed top-24 right-8 z-50 px-8 py-4 rounded-2xl shadow-2xl transform translate-x-full transition-all duration-500 ${
                      type === 'success' 
                          ? 'bg-gradient-to-r from-green-600 to-green-500 text-white' 
                          : 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                  }`;
                  
                  notification.innerHTML = `
                      <div class="flex items-center gap-3">
                          <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-2xl"></i>
                          <div>
                              <p class="font-bold text-lg">${type === 'success' ? 'Success!' : 'Error'}</p>
                              <p class="text-sm opacity-90">${message}</p>
                          </div>
                      </div>
                  `;
                  
                  document.body.appendChild(notification);
                  
                  // Animate in
                  setTimeout(() => {
                      notification.classList.remove('translate-x-full');
                      notification.classList.add('translate-x-0');
                  }, 100);
                  
                  // Remove after 5 seconds
                  setTimeout(() => {
                      notification.classList.add('translate-x-full');
                      setTimeout(() => {
                          if (notification.parentNode) {
                              notification.parentNode.removeChild(notification);
                          }
                      }, 500);
                  }, 5000);
              }
              
              // Form field animations
              const formInputs = document.querySelectorAll('input, textarea, select');
              formInputs.forEach(input => {
                  input.addEventListener('focus', function() {
                      gsap.to(this.parentElement, { scale: 1.02, duration: 0.2 });
                  });
                  
                  input.addEventListener('blur', function() {
                      gsap.to(this.parentElement, { scale: 1, duration: 0.2 });
                  });
              });
          
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for solutions', e);
    }
  }
}

