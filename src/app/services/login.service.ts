import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
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
  async createUser(password: string, email: string, nombre: string, apellido: string, rol: string): Promise<void> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        const newUser = new Usuario(user.uid, nombre, user.email!, apellido, rol, password);
        await this.firestore.doc(`profiles/${user.uid}`).set({ ...newUser });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  validateCredentials(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
}
