import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
    // HttpClient
    // RouterModule.forChild(routes)
  ],
  declarations: [AuthPage,LoginComponent,SignupComponent]
})
export class AuthPageModule {}
