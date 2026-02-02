import { Routes } from '@angular/router';
import { roleGuard } from './core/gaurds/role.gaurd';
import { patientsResolver } from './core/resolvers/patients-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/role-selection/role-selection').then((m) => m.RoleSelection),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard-shell/dashboard-shell').then((m) => m.DashboardShell),
    canActivate: [roleGuard],
    resolve: {
      patients: patientsResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
