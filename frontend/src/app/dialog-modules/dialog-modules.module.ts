import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JoinConfimationComponent } from './join-confimation/join-confimation.component';
// import { CreateGroupComponent } from './create-group/create-group.component';

 
@NgModule({
  declarations: [CreateGroupComponent,JoinConfimationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
    entryComponents:[
    CreateGroupComponent, JoinConfimationComponent
  ],
})  
export class DialogModulesModule { }
 