import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  listMenu: Array<any>;
  openSubmenuIndex: number | null = null;
  constructor(private readonly menu: MenuService,
    private readonly loginService: LoginService,
    private router: Router
  ) {
    this.listMenu = new Array<any>();
  }
  ngOnInit(): void {
    this.menu.getMenu().subscribe((rs: any) => {
      this.listMenu = rs.menu.sort((a: any, b: any) => a.title.localeCompare(b.title));
    })
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
