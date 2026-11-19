import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginPageComponent
  // },

  
    { path: 'users', component: UserListComponent },
  { path: 'add-user', component: AddUserComponent },
    {path:'user-list',component:UserListComponent},

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
