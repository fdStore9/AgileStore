import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UploadFilesService } from '../../services/upload-files.service';
import * as ui from '../../shared/ui.actions';
import { AppState } from '../../app.reducer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnDestroy, OnInit {
  skillsList: Array<any>;
  user$: Observable<Usuario>;
  isEditing: boolean = false;
  model: any;
  defaultImage = '../../../assets/images/user.png';
  selectedImage: string = this.defaultImage;
  user: Usuario = new Usuario();
  file: File;
  uiSubscription: Subscription;
  isLoading: boolean = false;
  constructor(private store: Store<{ user: Usuario }>,
    private fileUpload: UploadFilesService,
    private spinner: NgxSpinnerService,
    private storeUi: Store<AppState>
  ) {
    this.user$ = this.store.select('user');
  }

  ngOnInit(): void {
    this.store.dispatch(ui.isLoading());
    this.user$.subscribe((user: any) => {
      if (user.user) {
        this.user = { ...user.user };
        this.user.skills = this.user.skills.map(skill => ({ ...skill }));
        this.user.avatar = this.user.avatar || this.defaultImage;
        this.handleDateChange(this.user.fechaNacimiento as any);
        this.store.dispatch(ui.stopLoading());
      } else {
        this.user = new Usuario();
      }
    });
    this.subscriptionLoading();
  }
  subscriptionLoading() {
    this.uiSubscription = this.storeUi.select('ui')
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
  handleDateChange(date: { day: number; month: number; year: number }) {
    debugger;
    const formattedDate = date.day ? `${date.day} de ${this.getMonthName(date.month)} de ${date.year}` : date;
    this.user.fechaNacimiento = formattedDate as any;
  }
  getMonthName(month: number): string {
    const monthNames = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return monthNames[month - 1];
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  editProfile() {
    this.isEditing = !this.isEditing;
  }
  async updateProfile() {
    this.store.dispatch(ui.isLoading());
    if (this.user) {
      if (this.file) {
        await this.fileUpload.uploadFile(this.file, this.user.nombre).then(rs => {
          this.selectedImage = rs;
          this.user.avatar = this.selectedImage;
        })
      }
      await this.fileUpload.updateDocument('profiles', this.user.uid, this.user).then((rs) => {
        console.log(rs);
      })
      this.store.dispatch(ui.stopLoading());
      this.isEditing = false; // Salir del modo edición después de guardar
    }
  }
}
