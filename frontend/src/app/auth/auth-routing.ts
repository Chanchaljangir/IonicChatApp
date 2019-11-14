import { NgModule, Component  } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
    // {
        // path: 'auth', children:[
            {
                path:'login', component: LoginComponent
              },
            {
                path:'signup', component: SignupComponent
            }, 
        // ]
    // },
];
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AuthRoutingModule { }  


              