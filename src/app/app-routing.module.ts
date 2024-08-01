import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { TablesComponent } from './components/tables/tables.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

const routes: Routes = [
  {
    path: '',
    component: LoginRegistrationComponent,
    canActivate: [],
  },
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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
