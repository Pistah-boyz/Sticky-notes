import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs'; 
import { map, filter, switchMap } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { TaskserviceService } from './taskservice.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {  MatButtonModule} from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {  MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule} from '@angular/material/input';
import {  MatListModule} from '@angular/material/list';
import {  MatSidenavModule} from '@angular/material/sidenav';
import {  MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { TaskscardsComponent } from './taskscards/taskscards.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginauthComponent } from './loginauth/loginauth.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskscardsComponent,
    AddtaskComponent,
    ContactusComponent,
    LoginauthComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase,'angularfs'),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatTabsModule
      ],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  providers: [TaskserviceService,AuthService,GuardService,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
