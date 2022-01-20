import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { HomePageComponent } from './app.home-page';
import { AboutPageComponent } from './app.about-page';


const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
 
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
