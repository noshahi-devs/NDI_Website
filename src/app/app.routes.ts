import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { AboutPremiumComponent } from './pages/about-premium/about-premium';
import { ServicesComponent } from './pages/services/services';
import { SolutionsComponent } from './pages/solutions/solutions';
import { ProductsComponent } from './pages/products/products';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { TechnologiesComponent } from './pages/technologies/technologies';
import { TechAngularComponent } from './pages/tech-angular/tech-angular';
import { TechReactComponent } from './pages/tech-react/tech-react';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about-premium', component: AboutPremiumComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'technologies/angular', component: TechAngularComponent },
  { path: 'technologies/react', component: TechReactComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
