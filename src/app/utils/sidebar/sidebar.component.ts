import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  listMenu: Array<any>;
  openSubmenuIndex: number | null = null;
  uiSubscription: Subscription;
  user: any;
  defaultImage = '../../../assets/images/user.png';

  constructor(
    private readonly loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.listMenu = new Array<any>();
  }
  ngOnInit(): void {
    this.uiSubscription = this.store.select('user')
      .subscribe(setUser => {
        this.user = setUser;
        (this.user)
      });
  }
  toggleSubmenu(index: number): void {
    this.openSubmenuIndex = this.openSubmenuIndex === index ? null : index;
  }
  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/']);
    })

  }
}
