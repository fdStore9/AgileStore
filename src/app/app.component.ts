import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AgileStore';
  constructor(private loginService: LoginService) {
    this.loginService.initAuthListener();
  }
}
