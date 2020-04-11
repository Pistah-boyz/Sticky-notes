import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskscardsComponent } from './taskscards/taskscards.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginauthComponent } from './loginauth/loginauth.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GuardService } from './guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path:'login', component:LoginauthComponent}, 
  { path:'addtask', component:AddtaskComponent,canActivate:[GuardService] },
  { path:'tasks', component:TaskscardsComponent,canActivate:[GuardService]},
  { path:'ContactUS', component:ContactusComponent,canActivate:[GuardService]},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
