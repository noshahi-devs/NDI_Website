// @ts-nocheck
import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements AfterViewInit, OnDestroy {
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
              
              // Modal Functions
              function openModal(product) {
                  const modal = document.getElementById('projectModal');
                  const content = document.getElementById('modalContent');
                  
                  const productData = {
                      nim: {
                          title: 'NIM - Noshahi Institute Manager',
                          description: 'Complete school management system',
                          features: ['Student Management', 'Teacher Management', 'Attendance Tracking', 'Fee Management', 'Exam Management', 'Report Generation'],
                          image: 'https://picsum.photos/seed/nim/600/400'
                      },
                      ntb: {
                          title: 'NTB - Noshahi Tech Books',
                          description: 'Interactive e-learning platform',
                          features: ['Digital Content', 'Video Lectures', 'Quiz System', 'Progress Tracking', 'Interactive Learning'],
                          image: 'https://picsum.photos/seed/ntb/600/400'
                      },
                      nvl: {
                          title: 'NVL - Noshahi VirtuLearn',
                          description: 'AI-powered learning platform',
                          features: ['AI Recommendations', 'Performance Analytics', 'Smart Learning', 'Multi-role System', 'Advanced Dashboard'],
                          image: 'https://picsum.photos/seed/nvl/600/400'
                      },
                      ecommerce: {
                          title: 'Ecommerce Platform',
                          description: 'Complete online selling solution',
                          features: ['Product Management', 'Shopping Cart', 'Payment Integration', 'Order Management', 'Inventory Tracking'],
                          image: 'https://picsum.photos/seed/ecommerce/600/400'
                      },
                      realestate: {
                          title: 'Real Estate Management',
                          description: 'Property management platform',
                          features: ['Property Listings', 'Agent Management', 'Buyer Portal', 'Lead Management', 'Advanced Search'],
                          image: 'https://picsum.photos/seed/realestate/600/400'
                      },
                      nwt: {
                          title: 'NWT - Noshahi Work Track',
                          description: 'Employee productivity system',
                          features: ['Task Management', 'Time Tracking', 'Performance Analytics', 'Project Management', 'Team Collaboration'],
                          image: 'https://picsum.photos/seed/nwt/600/400'
                      }
                  };
                  
                  const data = productData[product];
                  content.innerHTML = `
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                              <img src="${data.image}" alt="${data.title}" class="w-full h-64 object-cover rounded-2xl">
                          </div>
                          <div>
                              <h3 class="text-3xl font-black text-gray-900 mb-4">${data.title}</h3>
                              <p class="text-gray-700 mb-6">${data.description}</p>
                              <h4 class="text-xl font-bold text-gray-900 mb-4">Key Features:</h4>
                              <ul class="space-y-3 mb-6">
                                  ${data.features.map(feature => `
                                      <li class="flex items-center gap-3">
                                          <i class="fas fa-check-circle text-orange-600"></i>
                                          <span class="text-gray-700">${feature}</span>
                                      </li>
                                  `).join('')}
                              </ul>
                              <div class="flex gap-4">
                                  <a href="#" class="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition">
                                      <i class="fas fa-play mr-2"></i>View Demo
                                  </a>
                                  <a href="#" class="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition">
                                      <i class="fas fa-download mr-2"></i>Download Brochure
                                  </a>
                              </div>
                          </div>
                      </div>
                  `;
                  
                  modal.classList.add('active');
              }
              
              function openProjectModal(project) {
                  const modal = document.getElementById('projectModal');
                  const content = document.getElementById('modalContent');
                  
                  const projectData = {
                      'school-erp': {
                          title: 'School ERP for XYZ School',
                          client: 'XYZ School, USA',
                          problem: 'Manual management of 2000+ students and 100+ teachers was inefficient and error-prone.',
                          solution: 'Implemented comprehensive ERP system with automated attendance, fee management, and reporting.',
                          tech: ['Angular', '.NET', 'SQL Server', 'Azure'],
                          results: ['95% reduction in manual work', '100% accuracy in attendance', 'Real-time reporting'],
                          image: 'https://picsum.photos/seed/school/600/400'
                      },
                      'fashion-store': {
                          title: 'Fashion Ecommerce Store',
                          client: 'Fashion Brand, UK',
                          problem: 'Limited online presence and manual order processing.',
                          solution: 'Built modern e-commerce platform with integrated payment and inventory management.',
                          tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                          results: ['300% increase in online sales', 'Automated order processing', 'Improved customer experience'],
                          image: 'https://picsum.photos/seed/fashion/600/400'
                      }
                  };
                  
                  const data = projectData[project] || projectData['school-erp'];
                  content.innerHTML = `
                      <div class="space-y-6">
                          <img src="${data.image}" alt="${data.title}" class="w-full h-64 object-cover rounded-2xl">
                          <h3 class="text-3xl font-black text-gray-900">${data.title}</h3>
                          <p class="text-lg text-orange-600 font-semibold">Client: ${data.client}</p>
                          
                          <div class="space-y-4">
                              <div>
                                  <h4 class="text-xl font-bold text-gray-900 mb-2">Problem</h4>
                                  <p class="text-gray-700">${data.problem}</p>
                              </div>
                              
                              <div>
                                  <h4 class="text-xl font-bold text-gray-900 mb-2">Solution</h4>
                                  <p class="text-gray-700">${data.solution}</p>
                              </div>
                              
                              <div>
                                  <h4 class="text-xl font-bold text-gray-900 mb-2">Technologies Used</h4>
                                  <div class="flex flex-wrap gap-2">
                                      ${data.tech.map(tech => `
                                          <span class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">${tech}</span>
                                      `).join('')}
                                  </div>
                              </div>
                              
                              <div>
                                  <h4 class="text-xl font-bold text-gray-900 mb-2">Results</h4>
                                  <ul class="space-y-2">
                                      ${data.results.map(result => `
                                          <li class="flex items-center gap-3">
                                              <i class="fas fa-check-circle text-green-600"></i>
                                              <span class="text-gray-700">${result}</span>
                                          </li>
                                      `).join('')}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  `;
                  
                  modal.classList.add('active');
              }
              
              function closeModal() {
                  const modal = document.getElementById('projectModal');
                  modal.classList.remove('active');
              }
              
              // Filter Projects
              function filterProjects(category) {
                  const projects = document.querySelectorAll('.project-card');
                  const buttons = document.querySelectorAll('.filter-btn');
                  
                  // Update active button
                  buttons.forEach(btn => {
                      btn.classList.remove('active');
                      if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent.includes('All'))) {
                          btn.classList.add('active');
                      }
                  });
                  
                  // Filter projects
                  projects.forEach(project => {
                      if (category === 'all' || project.dataset.category === category) {
                          project.style.display = 'block';
                          gsap.fromTo(project, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3 });
                      } else {
                          project.style.display = 'none';
                      }
                  });
              }
              
              // Close modal on outside click
              window.onclick = function(event) {
                  const modal = document.getElementById('projectModal');
                  if (event.target === modal) {
                      closeModal();
                  }
              }
              
              // GSAP Animations
              gsap.registerPlugin(ScrollTrigger);
              
              // Hero animations
              gsap.fromTo("h1", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", delay: 0.2 });
              gsap.fromTo("p", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8 });
              
              // Portfolio cards animation
              gsap.utils.toArray(".portfolio-card").forEach((card, i) => {
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
              
              // Project cards animation
              gsap.utils.toArray(".project-card").forEach((card, i) => {
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
              
              // Stats animation
              gsap.utils.toArray(".text-5xl").forEach((stat, i) => {
                  gsap.fromTo(stat, { scale: 0, opacity: 0 }, { 
                      scale: 1, 
                      opacity: 1, 
                      duration: 0.8, 
                      scrollTrigger: { 
                          trigger: stat, 
                          start: "top 80%", 
                          toggleActions: "play none none reverse" 
                      }, 
                      delay: i * 0.2 
                  });
              });
          
      
      }, 100);
    } catch (e) {
      console.error('Error initializing scripts for portfolio', e);
    }
  }
}

