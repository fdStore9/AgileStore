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
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'userProfile', component: UserProfileComponent },
      { path: 'listProducts', component: ListProductsComponent },
      { path: 'tables', component: TablesComponent },
      { path: 'home', component: HomeComponent },
      { path: 'todayMenu', component: TodayMenuComponent },
      { path: 'store', component: StoreComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
