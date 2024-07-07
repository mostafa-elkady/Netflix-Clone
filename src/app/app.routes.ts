import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent:() => import('./components/login/login.component').then(a=> a.LoginComponent)},
    {path:'home', loadComponent:() => import('./components/home/home.component').then(a=> a.HomeComponent)},
    {path:'**', redirectTo:'', pathMatch:'full'}
];
