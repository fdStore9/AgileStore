import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';

const routes: Routes = [
  {
    path: '',
    component: LoginRegistrationComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
