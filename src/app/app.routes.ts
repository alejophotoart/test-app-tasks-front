import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'view-task/:id',
    loadComponent: () => import('./pages/view-task/view-task.page').then( m => m.ViewTaskPage)
  },
  {
    path: 'create-edit-task',
    loadComponent: () => import('./pages/create-edit-task/create-edit-task.page').then( m => m.CreateEditTaskPage)
  },
];

