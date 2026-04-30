import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeaderComponent } from './layout/site-header.component';
import { SiteFooterComponent } from './layout/site-footer.component';
import { ChatbotComponent } from './layout/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent, ChatbotComponent],
  template: `
    <app-site-header />
    <main class="page-shell">
      <router-outlet />
    </main>
    <app-site-footer />
    <app-chatbot />
  `,
})
export class AppComponent {}
