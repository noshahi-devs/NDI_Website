const fs = require('fs');
const path = require('path');

const currentHtmlDir = path.join(__dirname, 'current-html');
const pagesDir = path.join(__dirname, 'src', 'app', 'pages');

const pages = [
  { file: 'index.html', component: 'home', className: 'HomeComponent' },
  { file: 'about.html', component: 'about', className: 'AboutComponent' },
  { file: 'about-premium.html', component: 'about-premium', className: 'AboutPremiumComponent' },
  { file: 'services.html', component: 'services', className: 'ServicesComponent' },
  { file: 'solutions.html', component: 'solutions', className: 'SolutionsComponent' },
  { file: 'products.html', component: 'products', className: 'ProductsComponent' },
  { file: 'portfolio.html', component: 'portfolio', className: 'PortfolioComponent' },
  { file: 'technologies.html', component: 'technologies', className: 'TechnologiesComponent' },
  { file: 'tech-angular.html', component: 'tech-angular', className: 'TechAngularComponent' },
  { file: 'tech-react.html', component: 'tech-react', className: 'TechReactComponent' },
  { file: 'contact.html', component: 'contact', className: 'ContactComponent' },
];

pages.forEach(page => {
  const filePath = path.join(currentHtmlDir, page.file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract HTML
  let startIdx = content.indexOf('</nav>');
  if (startIdx === -1) {
      const navStart = content.indexOf('<nav');
      if (navStart !== -1) {
          const navEnd = content.indexOf('</nav>', navStart);
          startIdx = navEnd !== -1 ? navEnd : navStart;
      } else {
          startIdx = content.indexOf('<body>') + 6;
      }
  } else {
      startIdx += 6;
  }

  let endIdx = content.indexOf('<!-- Premium Footer -->');
  if (endIdx === -1) endIdx = content.indexOf('<footer');
  if (endIdx === -1) endIdx = content.indexOf('</body>');

  let htmlContent = content.substring(startIdx, endIdx).trim();

  // Remove the old cursor divs if they are in the component HTML since we might want them global
  // But actually, it's fine if they are duplicated per page, or we can remove them.
  htmlContent = htmlContent.replace(/<div class="cursor-dot"><\/div>/g, '');
  htmlContent = htmlContent.replace(/<div class="cursor-outline"><\/div>/g, '');

  // Extract JS
  let jsContent = '';
  const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    jsContent += match[1] + '\n';
  }
  
  // Wrap JS in a setTimeout to ensure DOM is fully ready after Angular renders it
  if (jsContent.trim().length > 0) {
      jsContent = `setTimeout(() => {\n${jsContent}\n}, 100);`;
  }
  
  // Create HTML file
  const compDir = path.join(pagesDir, page.component);
  if (!fs.existsSync(compDir)) {
      fs.mkdirSync(compDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(compDir, `${page.component}.html`), htmlContent);

  const tsContent = `import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var THREE: any;
declare var gsap: any;
declare var ScrollTrigger: any;

@Component({
  selector: 'app-${page.component}',
  standalone: true,
  imports: [],
  templateUrl: './${page.component}.html',
  styleUrl: './${page.component}.css',
})
export class ${page.className} implements AfterViewInit, OnDestroy {
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
      ${jsContent.replace(/\n/g, '\n      ')}
    } catch (e) {
      console.error('Error initializing scripts for ${page.component}', e);
    }
  }
}
`;

  fs.writeFileSync(path.join(compDir, `${page.component}.ts`), tsContent);
  console.log(`Processed ${page.component}`);
});
