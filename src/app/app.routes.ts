import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ClientManagement } from './pages/client-management/client-management';

export const routes: Routes = [
  { path: '', redirectTo: 'analytics', pathMatch: 'full' },
  { path: 'analytics', component: Dashboard },
  { path: 'clients', component: ClientManagement },
  { path: '**', redirectTo: 'analytics' }
];