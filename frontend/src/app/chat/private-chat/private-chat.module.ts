import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrivateChatPage } from './private-chat.page';

import { MaterialModule } from 'src/app/material.module';
// import { CreateGroupComponent } from 'src/app/dialog-modules/create-group/create-group.component';
import { MatDialogModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PrivateChatPage
  }
]; 

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicModule,
    RouterModule.forChild(routes), 
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [MatDialogModule],
  declarations: [PrivateChatPage,PrivateChatPage]
})
export class PrivateChatPageModule {}
