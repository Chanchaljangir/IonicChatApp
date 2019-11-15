import { Component, OnInit,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-join-confimation',
  templateUrl: './join-confimation.component.html',
  styleUrls: ['./join-confimation.component.scss']
})
export class JoinConfimationComponent implements OnInit {
  addMembersForm:FormGroup; 
  constructor(public dialogRef: MatDialogRef<JoinConfimationComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public chatService:ChatServiceService) { }
 
  user=JSON.parse(localStorage.getItem('user'));
  ngOnInit() {
    this.addMembersForm = new FormGroup({
      'participants': new FormControl(this.user.id),
      'date': new FormControl(Date())
  });
  }
  
  joinConfirm(){
    this.chatService.addParticipant(this.data,this.addMembersForm.value).subscribe(data=>{
      if(data.success){
          console.log("new participant join ", data);   
    }
    
    else{ 
      console.log("some err");     
    } 
    this.dialogRef.close("closed");
    });
  }
  notConfirm(){
    this.dialogRef.close("closed");
  }

}
