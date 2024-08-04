import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './utils/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { FormsComponent } from './shared/forms/forms.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // <-- Asegúrate de que este import esté presente
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgbAlertModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './shared/date-picker/date-picker.component';
import { JsonPipe } from '@angular/common';
import { TablesComponent } from './components/tables/tables.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductModalComponent } from './shared/product-modal/product-modal.component';
import { CurrencyFormatDirective } from './utils/directive/currencyFormat';
import { AlertsComponent } from './utils/alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginRegistrationComponent,
    FormsComponent,
    SpinnerComponent,
    UserProfileComponent,
    DatePickerComponent,
    TablesComponent,
    ListProductsComponent,
    ProductModalComponent,
    CurrencyFormatDirective,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule, // <-- Asegúrate de que este import esté presente
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    NgbAlertModule,
    JsonPipe,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
