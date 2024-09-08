import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  title = 'AgileStore';
  mostrarNavbar: boolean = true;
  constructor(private loginService: LoginService,private router: Router) {
    this.loginService.initAuthListener();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.mostrarNavbar = event.url !== '/';
      }
    });
  }
}
