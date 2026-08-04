import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing';
import { CatalogComponent } from './features/catalog/catalog';
import { TemplateDetailComponent } from './features/template-detail/template-detail';
import { WeddingInvitationComponent } from './features/wedding-invitation/wedding-invitation';
import { KidsInvitationComponent } from './features/kids-invitation/kids-invitation';
import { TheLetterInvitationComponent } from './features/the-letter-invitation/the-letter-invitation';
import { MinimalismComponent } from './features/minimalism/minimalism';
import { GoldenLuxuryComponent } from './features/golden-luxury/golden-luxury';
import { AdminLoginComponent } from './features/admin/admin-login/admin-login';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminCategoriesComponent } from './features/admin/admin-categories/admin-categories';
import { AdminTemplatesComponent } from './features/admin/admin-templates/admin-templates';
import { AdminOrdersComponent } from './features/admin/admin-orders/admin-orders';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public catalog routes
  { path: '', component: LandingComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: TemplateDetailComponent },
  { path: 'wedding-invite', component: WeddingInvitationComponent },
  { path: 'invitation', component: WeddingInvitationComponent },
  { path: 'the-letter', component: TheLetterInvitationComponent },
  { path: 'the-letter-invitation', component: TheLetterInvitationComponent },
  { path: 'kids-invitation', component: KidsInvitationComponent },
  { path: 'magical-party', component: KidsInvitationComponent },
  { path: 'kids-forest', component: KidsInvitationComponent },
  { path: 'minimalism', component: MinimalismComponent },
  { path: 'golden-luxury', component: GoldenLuxuryComponent },

  // Admin login
  { path: 'admin/login', component: AdminLoginComponent },

  // Protected Admin Layout & dashboard routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'templates', component: AdminTemplatesComponent },
      { path: 'orders', component: AdminOrdersComponent }
    ]
  },

  // Fallback wildcard route
  { path: '**', redirectTo: '' }
];
