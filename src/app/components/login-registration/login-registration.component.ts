import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { title } from 'process';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SweetAlert } from '../../shared/Alerts';
import { MessagesToShow } from '../../shared/enums';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.css'
})
export class LoginRegistrationComponent implements OnInit, OnDestroy {
  isLoginActive: boolean;
  ListInputLoginForm: Array<any>;
  ListInputRegisterForm: Array<any>;
  getForms: Usuario;
  uiSubscription: Subscription;
  isLoading: boolean = false;
  alerts: SweetAlert;

  constructor(private readonly loginService: LoginService,
    private store: Store<AppState>,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.isLoginActive = true;
    this.ListInputRegisterForm = [
      {
        title: 'Nombre',
        name: 'name',
        type: 'text',
        placeholder: 'Ingrese Nombre',
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-person-circle'
      },
      {
        title: 'Apellidos',
        name: 'lastName',
        type: 'text',
        placeholder: 'Ingrese Apellidos',
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-person-fill-check'
      },
      {
        name: 'role',
        type: 'select',
        placeholder: 'Seleccione',
        title: 'Rol',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Mesero', value: 'user' },
          { label: 'Otro', value: 'guest' }
        ],
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-filter'
      },
      {
        title: 'Contraseña',
        name: 'contraseniaR',
        type: 'password',
        placeholder: 'Ingrese Contraseña',
        validation: [Validators.required],
        class: 'col-md-6',
        icon: 'bi-lock'
      },
      {
        title: 'Correo',
        name: 'email',
        type: 'text',
        placeholder: 'Ingrese Correo',
        validation: [Validators.required, Validators.email],
        icon: 'bi-at'
      }
    ]
    this.ListInputLoginForm = [
      {
        title: 'Correo',
        name: 'email',
        type: 'text',
        placeholder: 'Ingrese Correo',
        validation: [Validators.required, Validators.email],
        icon: 'bi-at'
      },
      {
        title: 'Contraseña',
        name: 'Contrasenia',
        type: 'password',
        placeholder: 'Ingrese Contraseña',
        validation: [Validators.required],
        icon: 'bi-lock'
      }
    ];
    this.alerts = new SweetAlert();
  }
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        this.isLoading = ui.isLoading;
        if (this.isLoading) {
          this.spinner.show();
        } else {
          this.spinner.hide();
        }
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
  changueForm(name: string): void {
    this.isLoginActive = name === 'login';
  }
  getFormvalue(formsValue: any) {
    this.isLoginActive ? this.login(formsValue) : this.createUser(formsValue);
  }
  login(formsValue: any) {
    this.store.dispatch(ui.isLoading());
    if (this.isLoginActive) {
      this.loginService.validateCredentials(
        formsValue.email.value,
        formsValue.Contrasenia.value
      ).then(rs => {
        this.store.dispatch(ui.stopLoading());
        rs.status === 200 ? this.router.navigate(['/userProfile']) :
        this.alerts.showAlert(MessagesToShow.errorMessages.INVALID_ERROR, "error", rs.error || "")
      });
    }
  }
  createUser(formsValue: any) {
    this.loginService.createUser(
      formsValue.contraseniaR.value,
      formsValue.email.value,
      formsValue.name.value,
      formsValue.lastName.value,
      formsValue.role.value
    ).then(rs => {
      this.store.dispatch(ui.stopLoading());
      rs.status === 200 ?
        this.alerts.showAlert(MessagesToShow.success.GOOD, "success", MessagesToShow.success.SUCCESSFUL_REGISTRATION) :
        this.alerts.showAlert(MessagesToShow.errorMessages.INVALID_ERROR, "error", rs.error)
    });
  }

}
