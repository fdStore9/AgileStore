import { Component, input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { title } from 'process';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.css'
})
export class LoginRegistrationComponent implements OnInit {
  isLoginActive: boolean;
  ListInputLoginForm: Array<any>;
  ListInputRegisterForm: Array<any>;
  getForms: any;
  constructor() {
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
  }
  ngOnInit(): void {

  }
  changueForm(name: string): void {
    this.isLoginActive = name === 'login';
  }
  recibirMensaje(message: string) {
    this.getForms = message;
    console.log(this.getForms, 'gano');
  }
}
