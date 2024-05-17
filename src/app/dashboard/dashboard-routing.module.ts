import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthService } from '../auth.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate : [AuthService],
    children: [
      {
        path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'plans',
        loadChildren: () => import('../plans/plans.module').then( m => m.PlansPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
