import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { CreateGroupComponent } from './create-group/create-group.component';

 
@NgModule({
  declarations: [CreateGroupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
    entryComponents:[
    CreateGroupComponent
  ],
})  
export class DialogModulesModule { }
 