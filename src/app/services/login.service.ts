import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import { FirebaseError } from 'firebase/app';

interface CreateUserResponse {
  status: number;
  user?: Usuario;
  error?: any;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userSubscription: Subscription;
  private _user: Usuario;

  get user() {
    return this._user
  }
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/profiles`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = Usuario.fromFirebase(firestoreUser);
            if (user) {
              this._user = user;
            }
          })
      }
    });

  }
  async createUser(password: string, email: string, nombre: string, apellido: string, rol: string): Promise<CreateUserResponse> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        const newUser = new Usuario(user.uid, nombre, user.email!, apellido, rol, password);
        await this.firestore.doc(`profiles/${user.uid}`).set({ ...newUser });
        return { status: 200, user: newUser };
      }
      return { status: 400, error: 'Error al crear usuario' };
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return { status: 409, error: 'El usuario ya existe' };
          case 'auth/invalid-email':
            return { status: 400, error: 'Correo electrónico inválido' };
          case 'auth/weak-password':
            return { status: 400, error: 'La contraseña debe tener al menos 6 caracteres' };
          default:
            return { status: 400, error: error.message || 'Error al crear usuario' };
        }
      }
      return { status: 400, error: 'Error desconocido' };
    }
  }

  async validateCredentials(email: string, password: string): Promise<{ status: number, error?: string }> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      return { status: 200 };
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof FirebaseError && error.code) {
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'Usuario no encontrado';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta';
            break;
          default:
            errorMessage = 'Error de autenticación';
        }
      }
      return { status: 400, error: errorMessage };
    }
  }
  logout() {
    return this.auth.signOut();
  }
}
