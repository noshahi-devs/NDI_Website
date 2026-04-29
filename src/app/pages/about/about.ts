// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
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
          
          // Canvas Background Animation for Logo
          const canvas = document.getElementById('logoCanvas');
          if (canvas) {
            const ctx = canvas.getContext('2d');
            
            // Set canvas size
            function resizeCanvas() {
              canvas.width = canvas.offsetWidth;
              canvas.height = canvas.offsetHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Particle system
            const particles = [];
            const particleCount = 50;
            
            class Particle {
              constructor() {
                this.reset();
              }
              
              reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = ['#faa506', '#3b82f6', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 4)];
              }
              
              update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
              }
              
              draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            
            // Create particles
            for (let i = 0; i < particleCount; i++) {
              particles.push(new Particle());
            }
            
            // Connection lines
            function drawConnections() {
              for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                  const dx = particles[i].x - particles[j].x;
                  const dy = particles[i].y - particles[j].y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance < 100) {
                    ctx.globalAlpha = (1 - distance / 100) * 0.2;
                    ctx.strokeStyle = '#faa506';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                  }
                }
              }
            }
            
            // Animation loop
            function animate() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw gradient background
              const gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width / 2
              );
              gradient.addColorStop(0, 'rgba(250, 165, 6, 0.02)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0.02)');
              ctx.fillStyle = gradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Update and draw particles
              particles.forEach(particle => {
                particle.update();
                particle.draw();
              });
              
              // Draw connections
              drawConnections();
              
              requestAnimationFrame(animate);
            }
            
            animate();
          }
          
          // GSAP Animations
          gsap.registerPlugin(ScrollTrigger);
          
          // Hero animations
          gsap.fromTo(".section-title", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1)", delay: 0.2 });
          gsap.fromTo(".text-xl.text-gray-600", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
          
          // Logo container animation
          gsap.fromTo(".relative.bg-gradient-to-br", { scale: 0.8, opacity: 0, rotation: -5 }, { 
            scale: 1, 
            opacity: 1, 
            rotation: 0, 
            duration: 1.2, 
            ease: "back.out(1.7)", 
            delay: 0.5 
          });
          
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
          document.querySelectorAll('.btn-premium, button').forEach(btn => {
            btn.addEventListener('click', () => { 
              if (!btn.closest('form')) {
                alert('🚀 Welcome to Noshahi Developers — schedule your personalized consultation!');
              }
            });
          });
        
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for about', e);
    }
  }
}

