import { Route } from '@angular/router';
import { AnonymGuard } from './core/guards/anonym.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { Navigate } from './core/enums/navigate-enums';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Navigate.LOGIN,
  },
  {
    path: Navigate.LOGIN,
    loadComponent: () =>
      import('./pages/log-in/log-in.component').then((m) => m.LogInComponent),
    canActivate: [AnonymGuard],
  },
  {
    path: Navigate.REGISTER,
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [AnonymGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: Navigate.PRODUCT,
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: Navigate.SALESMANAGER,
        loadComponent: () =>
          import('./pages/sales-managers/sales-managers.component').then(
            (m) => m.SalesManagersComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: Navigate.LOGIN,
  },
];
