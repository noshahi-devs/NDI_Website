// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
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
              
              // Canvas Background Animation
              const canvas = document.getElementById('productCanvas');
              const ctx = canvas.getContext('2d');
              
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              
              const particles = [];
              const particleCount = 80;
              const connections = [];
              
              class Particle {
                  constructor() {
                      this.x = Math.random() * canvas.width;
                      this.y = Math.random() * canvas.height;
                      this.size = Math.random() * 3 + 1;
                      this.speedX = (Math.random() - 0.5) * 0.5;
                      this.speedY = (Math.random() - 0.5) * 0.5;
                      this.opacity = Math.random() * 0.5 + 0.1;
                      this.color = this.getRandomColor();
                  }
                  
                  getRandomColor() {
                      const colors = ['#faa506', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444'];
                      return colors[Math.floor(Math.random() * colors.length)];
                  }
                  
                  update() {
                      this.x += this.speedX;
                      this.y += this.speedY;
                      
                      if (this.x > canvas.width) this.x = 0;
                      if (this.x < 0) this.x = canvas.width;
                      if (this.y > canvas.height) this.y = 0;
                      if (this.y < 0) this.y = canvas.height;
                  }
                  
                  draw() {
                      ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
                      ctx.beginPath();
                      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                      ctx.fill();
                  }
              }
              
              // Create particles
              for (let i = 0; i < particleCount; i++) {
                  particles.push(new Particle());
              }
              
              // Animation loop
              function animateCanvas() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  
                  // Update and draw particles
                  particles.forEach(particle => {
                      particle.update();
                      particle.draw();
                  });
                  
                  // Draw connections
                  particles.forEach((particle, index) => {
                      for (let j = index + 1; j < particles.length; j++) {
                          const dx = particles[j].x - particle.x;
                          const dy = particles[j].y - particle.y;
                          const distance = Math.sqrt(dx * dx + dy * dy);
                          
                          if (distance < 150) {
                              const opacity = (1 - distance / 150) * 0.2;
                              ctx.strokeStyle = `rgba(250, 165, 6, ${opacity})`;
                              ctx.lineWidth = 1;
                              ctx.beginPath();
                              ctx.moveTo(particle.x, particle.y);
                              ctx.lineTo(particles[j].x, particles[j].y);
                              ctx.stroke();
                          }
                      }
                  });
                  
                  requestAnimationFrame(animateCanvas);
              }
              
              animateCanvas();
              
              // Resize canvas on window resize
              window.addEventListener('resize', () => {
                  canvas.width = window.innerWidth;
                  canvas.height = window.innerHeight;
              });
              
              // GSAP Animations
              gsap.registerPlugin(ScrollTrigger);
              
              // Hero animations
              gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
              gsap.fromTo("p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              
              // Product cards animation
              gsap.utils.toArray(".product-card").forEach((card, i) => {
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
              
              // Table row animations
              gsap.utils.toArray("tbody tr").forEach((row, i) => {
                  gsap.fromTo(row, { x: -50, opacity: 0 }, { 
                      x: 0, 
                      opacity: 1, 
                      duration: 0.6, 
                      scrollTrigger: { 
                          trigger: "#comparison", 
                          start: "top 80%", 
                          toggleActions: "play none none reverse" 
                      }, 
                      delay: i * 0.05 
                  });
              });
          
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for products', e);
    }
  }
}

