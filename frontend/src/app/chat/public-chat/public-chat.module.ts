import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PublicChatPage } from './public-chat.page';
import { MaterialModule } from 'src/app/material.module';
import { CreateGroupComponent } from 'src/app/dialog-modules/create-group/create-group.component';
import { MatDialogModule } from '@angular/material';


// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
// import {MatButtonModule} from '@angular/material/button';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [
  {
    path: '',
    component: PublicChatPage
  } 
];

@NgModule({
  declarations: [PublicChatPage,CreateGroupComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule,
    RouterModule.forChild(routes), 
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule
    // BrowserAnimationsModule,
    // NoopAnimationsModule,
    // MatButtonModule, MatCheckboxModule,MatMenuModule,MatIconModule
  ],
  // exports: [MatButtonModule, MatCheckboxModule,MatIconModule],
  exports: [MatDialogModule,CreateGroupComponent],
  entryComponents:[
    CreateGroupComponent
  ],
})
export class PublicChatPageModule {}
 