import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { TablesComponent } from './components/tables/tables.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StoreComponent } from './components/store/store.component';
import { TodayMenuComponent } from './components/today-menu/today-menu.component';
import { DashboardComponent } from './utils/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginRegistrationComponent,
    canActivate: [],
  },
  { path: '**', pathMatch:'full', redirectTo: '/login' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [ 
      {
        path: 'userProfile',
        component: UserProfileComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'listProducts',
        component: ListProductsComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'tables',
        component: TablesComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'todayMenu',
        component: TodayMenuComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'store',
        component: StoreComponent,
        canActivate: [ AuthGuard ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [ AuthGuard ],
      },
      // { path: '**', pathMatch:'full', redirectTo: '/login' },
    ],

  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
