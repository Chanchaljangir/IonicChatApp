import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPipePipe } from './my-pipe.pipe';



@NgModule({
  declarations: [MyPipePipe], 
  imports: [
    CommonModule
  ],
  exports:[MyPipePipe]
})
export class MyPipeModule { }
