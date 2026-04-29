// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentSlide = 0;
  slides = [
    {
      title: 'Digital Marketing',
      highlight: 'Agency Solutions',
      subtitle: 'Architecting high-performance software and seamless digital ecosystems that scale with your global ambition.',
      image: 'assets/img/digital solution.png',
      tag: 'Innovation Leader'
    },
    {
      title: 'Custom Enterprise',
      highlight: 'Grade Softwares',
      subtitle: 'Tailored premium solutions engineered to streamline complex operations and drive exponential business growth.',
      image: 'assets/img/custome software.png',
      tag: 'Strategic Engineering'
    },
    {
      title: 'Dedicated Global',
      highlight: 'Development Team',
      subtitle: 'Elite engineers and visionaries committed to delivering technical excellence and turning bold ideas into reality.',
      image: 'assets/img/team.png',
      tag: 'Engineering Excellence'
    }
  ];
  private carouselInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScripts();
      this.startCarousel();
    }
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.startCarousel();
    }
  }
  
  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    if (isPlatformBrowser(this.platformId) && typeof ScrollTrigger !== 'undefined') {
          // Kill all scroll triggers to prevent memory leaks when navigating between pages
          ScrollTrigger.getAll().forEach((t: any) => t.kill());
      }
  }

  initScripts() {
    try {
      setTimeout(() => {
          // ---------- GSAP SCROLL & INTERACTIONS ----------
          if (typeof gsap !== 'undefined') {
              gsap.registerPlugin(ScrollTrigger);
          
              // Hero text reveal
              gsap.fromTo("h1 span", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1)", delay: 0.2 });
              gsap.fromTo(".text-gray-500.max-w-xl", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              gsap.fromTo(".flex.flex-wrap.gap-5", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, delay: 1 });
              gsap.fromTo(".flex.gap-8.mt-16", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.2 });
          
              // Scroll-triggered reveal for cards
              gsap.utils.toArray(".service-card-light, .product-card-light").forEach((card, i) => {
                gsap.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }, delay: i * 0.1 });
              });
          
              // 3D Tilt effect on cards (light version)
              document.querySelectorAll('.service-card-light, .product-card-light').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                  const rect = card.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  gsap.to(card, { rotationY: x * 6, rotationX: y * -4, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
                });
                card.addEventListener('mouseleave', () => {
                  gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                });
              });
          }
      
          // Typewriter Effect for Hero Section
          const typewriterTexts = [
            "Intelligent Solutions",
            "AI-Powered Platforms",
            "Digital Excellence",
            "Future-Ready Systems"
          ];
      
          let textIndex = 0;
          let charIndex = 0;
          let isDeleting = false;
          let typewriterElement = document.getElementById('dynamic-text');
      
          function typeWriter() {
            if (!typewriterElement) return;
            const currentText = typewriterTexts[textIndex];
      
            if (isDeleting) {
              typewriterElement.textContent = currentText.substring(0, charIndex - 1);
              charIndex--;
            } else {
              typewriterElement.textContent = currentText.substring(0, charIndex + 1);
              charIndex++;
            }
      
            let typeSpeed = isDeleting ? 50 : 100;
      
            if (!isDeleting && charIndex === currentText.length) {
              typeSpeed = 2000;
              isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
              isDeleting = false;
              textIndex = (textIndex + 1) % typewriterTexts.length;
              typeSpeed = 500;
            }
      
            setTimeout(typeWriter, typeSpeed);
          }
      
          typeWriter();
          this.initCanvas();
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for home', e);
    }
  }

  initCanvas() {
    const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width) this.x = 0; else if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0; else if (this.y < 0) this.y = height;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(234, 88, 12, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(234, 88, 12, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }

    init();
    animate();
  }
}
