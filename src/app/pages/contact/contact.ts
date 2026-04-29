// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
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
              
              // Contact Form Validation and Submission
              const contactForm = document.getElementById('contactForm');
              
              if (contactForm) {
                  contactForm.addEventListener('submit', function(e) {
                      e.preventDefault();
                      
                      // Get form values
                      const firstName = contactForm.querySelector('input[type="text"]').value;
                      const lastName = contactForm.querySelectorAll('input[type="text"]')[1].value;
                      const email = contactForm.querySelector('input[type="email"]').value;
                      const phone = contactForm.querySelector('input[type="tel"]').value;
                      const serviceType = contactForm.querySelector('select').value;
                      const message = contactForm.querySelector('textarea').value;
                      
                      // Basic validation
                      if (!firstName || !lastName || !email || !phone || !serviceType || !message) {
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
              
              // FAQ Toggle
              function toggleFAQ(id) {
                  const answer = document.getElementById(`faq-answer-${id}`);
                  const icon = document.getElementById(`faq-icon-${id}`);
                  
                  answer.classList.toggle('active');
                  icon.classList.toggle('rotate-180');
              }
              
              // Live Chat Function
              function startLiveChat() {
                  showNotification('Live chat feature would be implemented here', 'success');
              }
              
              // Get Directions Function
              function getDirections(location) {
                  const addresses = {
                      'hq': 'Tech Hub, 123 Innovation Drive, Silicon Valley, CA 94025',
                      'ny': '456 Broadway, Suite 1200, New York, NY 10013'
                  };
                  
                  const address = addresses[location];
                  if (address) {
                      window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
                  }
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
              
              // Mobile Menu Toggle
              function toggleMobileMenu() {
                  const mobileMenu = document.getElementById('mobileMenu');
                  const mobileMenuPanel = document.getElementById('mobileMenuPanel');
                  
                  if (mobileMenu.classList.contains('hidden')) {
                      mobileMenu.classList.remove('hidden');
                      setTimeout(() => {
                          mobileMenuPanel.classList.remove('translate-x-full');
                      }, 10);
                      document.body.style.overflow = 'hidden';
                  } else {
                      mobileMenuPanel.classList.add('translate-x-full');
                      setTimeout(() => {
                          mobileMenu.classList.add('hidden');
                      }, 300);
                      document.body.style.overflow = 'auto';
                  }
              }
              
              // Close mobile menu when clicking outside
              document.getElementById('mobileMenu').addEventListener('click', function(e) {
                  if (e.target === this) {
                      toggleMobileMenu();
                  }
              });
              
              // Responsive adjustments
              function handleResponsive() {
                  const width = window.innerWidth;
                  
                  // Adjust hero title size based on screen width
                  const heroTitle = document.querySelector('.hero-title');
                  if (heroTitle) {
                      if (width < 480) {
                          heroTitle.style.fontSize = '2rem';
                      } else if (width < 768) {
                          heroTitle.style.fontSize = '2.5rem';
                      } else if (width < 1024) {
                          heroTitle.style.fontSize = '3rem';
                      } else {
                          heroTitle.style.fontSize = '';
                      }
                  }
                  
                  // Adjust form padding on mobile
                  const contactForm = document.querySelector('.contact-form');
                  if (contactForm) {
                      if (width < 640) {
                          contactForm.style.padding = '1rem';
                      } else if (width < 768) {
                          contactForm.style.padding = '1.5rem';
                      } else {
                          contactForm.style.padding = '';
                      }
                  }
              }
              
              // Initialize responsive adjustments
              handleResponsive();
              
              // Update on resize
              let resizeTimer;
              window.addEventListener('resize', function() {
                  clearTimeout(resizeTimer);
                  resizeTimer = setTimeout(handleResponsive, 250);
              });
              
              // Touch-friendly interactions for mobile
              if ('ontouchstart' in window) {
                  // Disable hover effects on touch devices
                  const style = document.createElement('style');
                  style.innerHTML = `
                      @media (hover: none) {
                          .contact-card:hover {
                              transform: none !important;
                          }
                          .card-3d:hover {
                              transform: none !important;
                          }
                      }
                  `;
                  document.head.appendChild(style);
              }
              
              // GSAP Animations
              gsap.registerPlugin(ScrollTrigger);
              
              // Hero animations
              gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
              gsap.fromTo("p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              
              // Contact cards animation
              gsap.utils.toArray(".contact-card").forEach((card, i) => {
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
              
              // FAQ items animation
              gsap.utils.toArray(".faq-item").forEach((item, i) => {
                  gsap.fromTo(item, { x: -50, opacity: 0 }, { 
                      x: 0, 
                      opacity: 1, 
                      duration: 0.6, 
                      scrollTrigger: { 
                          trigger: item, 
                          start: "top 80%", 
                          toggleActions: "play none none reverse" 
                      }, 
                      delay: i * 0.1 
                  });
              });
          
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for contact', e);
    }
  }
}

