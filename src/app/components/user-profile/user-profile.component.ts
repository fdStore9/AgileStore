import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as authActions from '../../shared/auth.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user$: Observable<Usuario | null>;
  user: any;
  profileImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog';
  isEditing: boolean = false;
  model: any;
  constructor(private store: Store<{ user: Usuario }>) {
    this.user$ = this.store.select('user');
    
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Aquí puedes añadir la lógica para manejar la carga de archivos
      console.log('File selected:', file);
    }
  }
  editProfile() {
    this.isEditing = !this.isEditing;
  }
  updateProfile() {
    if (this.user) {
      // Aquí puedes añadir la lógica para guardar los cambios
      console.log('Profile updated:', this.user);
      this.isEditing = false; // Salir del modo edición después de guardar
    }
  }
}
