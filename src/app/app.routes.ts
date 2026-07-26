import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing';
import { CatalogComponent } from './features/catalog/catalog';
import { TemplateDetailComponent } from './features/template-detail/template-detail';
import { WeddingInvitationComponent } from './features/wedding-invitation/wedding-invitation';
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
  { path: 'wedding-invitation', component: WeddingInvitationComponent },
  { path: 'invitation', component: WeddingInvitationComponent },

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
