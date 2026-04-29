import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-5"
           style="background-image:url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
      </div>

      <!-- Orange top accent -->
      <div class="h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600"></div>

      <!-- Main footer content -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          <!-- Company info -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center font-black text-xl text-white shadow-lg">N</div>
              <div>
                <h3 class="font-bold text-xl tracking-tight">Noshahi Developers</h3>
                <p class="text-orange-400 text-sm font-semibold">Inc.,</p>
              </div>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6 max-w-sm">
              Engineering the intelligent future with cutting-edge AI solutions, enterprise platforms, and transformative digital experiences.
            </p>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Twitter">
                <i class="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="LinkedIn">
                <i class="fab fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="GitHub">
                <i class="fab fa-github text-sm"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label="Dribbble">
                <i class="fab fa-dribbble text-sm"></i>
              </a>
            </div>
          </div>

          <!-- Services -->
          <div>
            <h4 class="font-bold text-lg mb-6 text-orange-400">Services</h4>
            <ul class="space-y-3">
              <li><a routerLink="/services" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>Enterprise Web</a></li>
              <li><a routerLink="/services" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>SaaS Platforms</a></li>
              <li><a routerLink="/services" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>ERP Solutions</a></li>
              <li><a routerLink="/services" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>AI Applications</a></li>
              <li><a routerLink="/services" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>Cloud Architecture</a></li>
            </ul>
          </div>

          <!-- Products -->
          <div>
            <h4 class="font-bold text-lg mb-6 text-orange-400">Products</h4>
            <ul class="space-y-3">
              <li><a routerLink="/products" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>VirtuLearn</a></li>
              <li><a routerLink="/products" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>Institute Manager</a></li>
              <li><a routerLink="/products" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>AI Analytics Suite</a></li>
              <li><a routerLink="/products" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>Cloud Dashboard</a></li>
              <li><a routerLink="/portfolio" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 no-underline text-sm"><i class="fas fa-chevron-right text-xs opacity-60"></i>Portfolio</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold text-lg mb-6 text-orange-400">Get in Touch</h4>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="fas fa-map-marker-alt text-orange-400 mt-0.5 flex-shrink-0"></i>
                <span class="text-gray-300 text-sm">Global Headquarters<br>Silicon Valley, CA</span>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-envelope text-orange-400 flex-shrink-0"></i>
                <a href="mailto:hello@noshahi.dev" class="text-gray-300 hover:text-orange-400 transition-colors text-sm no-underline">hello@noshahi.dev</a>
              </li>
              <li class="flex items-center gap-3">
                <i class="fas fa-phone text-orange-400 flex-shrink-0"></i>
                <a href="tel:+1234567890" class="text-gray-300 hover:text-orange-400 transition-colors text-sm no-underline">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="mt-16 pt-8 border-t border-gray-700">
          <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h4 class="font-bold text-lg mb-1">Stay Updated</h4>
              <p class="text-gray-400 text-sm">Get the latest insights on AI and digital transformation.</p>
            </div>
            <div class="flex gap-3 w-full lg:w-auto">
              <input type="email" placeholder="Enter your email"
                     class="flex-1 lg:w-80 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors text-sm">
              <button class="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="relative z-10 border-t border-gray-800 bg-black/50">
        <div class="max-w-7xl mx-auto px-6 lg:px-20 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-gray-400 text-sm">
              © 2025 Noshahi Developers Inc. All rights reserved. Engineering the Intelligent Future.
            </p>
            <div class="flex gap-6 text-sm">
              <a href="#" class="text-gray-400 hover:text-orange-400 transition-colors no-underline">Privacy Policy</a>
              <a href="#" class="text-gray-400 hover:text-orange-400 transition-colors no-underline">Terms of Service</a>
              <a href="#" class="text-gray-400 hover:text-orange-400 transition-colors no-underline">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {}
