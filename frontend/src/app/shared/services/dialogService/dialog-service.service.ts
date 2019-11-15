import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateGroupComponent } from 'src/app/dialog-modules/create-group/create-group.component';
import { JoinConfimationComponent } from 'src/app/dialog-modules/join-confimation/join-confimation.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
  joinConfirm_result: any;
  // privateGroup: any;

  constructor(public dialog: MatDialog,) { }

  addGroupDialog():void {
    console.log("add gp dialog");
    let MatDialogRef=this.dialog.open(CreateGroupComponent,{
      data:"MyVar"
    })
    MatDialogRef.afterClosed().subscribe(result=>{
      console.log("dialog was closed");
      console.log("dialog result is",result);
    })
  }   
  // addPrivateGroupDialog(addMoreMembers):void {
  //   // this.privateGroup=abc;
  //   // this.privateGroup=true;
  //   let MatDialogRef=this.dialog.open(PrivateGroupComponent ,{
  //     data:addMoreMembers,
  //     height: '270px',
  //     width: '250px',
  //   })
  //   MatDialogRef.afterClosed().subscribe(result=>{
  //     console.log("dialog was closed");
  //     console.log("dialog result is",result);
  //   })
  // }  

//add more members in private group chat
  // addMoreMembers(addMore,selectedgroup_id):void{
  //   let MatDialogRef=this.dialog.open(PrivateGroupComponent ,{
  //     data:{
  //       addPar:addMore,
  //     selectedGroup:selectedgroup_id}
  //   })
  //   MatDialogRef.afterClosed().subscribe(result=>{
  //     console.log("dialog was closed");
  //     console.log("dialog result is",result);
  //   })
  // }

  joinConfirmDialog(selectGroup_id):void{
    let MatDialogRef=this.dialog.open(JoinConfimationComponent,{
      data:selectGroup_id
    })
    MatDialogRef.afterClosed().subscribe(result=>{
      console.log("joinConfirmDialog was closed");
      console.log("joinConfirmDialog result is",result);
     this.joinConfirm_result= result;
    })
  }


  // addPaticipates(){
  //   let MatDialogRef=this.dialog.open(PrivateGroupComponent ,{
  //     data:"MyVar"
  //   })
  //   MatDialogRef.afterClosed().subscribe(result=>{
  //     console.log("dialog was closed");
  //     console.log("dialog result is",result);
  //   })
  // }
}
