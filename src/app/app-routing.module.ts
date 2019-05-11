import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListComponent } from './properties/list/list.component';
import { DetailComponent } from './properties/detail/detail.component';


const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'properties',
    component : ListComponent
  },
  {
    path : 'properties/:PROPERTY_ID',
    component : DetailComponent
  },
  {
    path : '',
    redirectTo: 'properties',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
