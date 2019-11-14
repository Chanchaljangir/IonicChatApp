
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {

  addGroupForm:FormGroup; 
  privateGroup: any;
  constructor(public dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private chatService: ChatServiceService,private toastControler:ToastController
    ) { }
    
    user=JSON.parse(localStorage.getItem('user')); 
  
    ngOnInit() {
    this.addGroupForm = new FormGroup({
      'groupName' : new FormControl(null, Validators.required), 
      'createdBy': new FormControl(this.user.id),
      'date': new FormControl(Date())
  }); 
  console.log("user###### ", this.user);
//   this.privateGroup=this.dialogService.privateGroup
//   console.log("this.privateGroup ",this.privateGroup);
}  

  close(){
    this.dialogRef.close("closed");
  }
addGroup(){
  console.log("addgrup call in dialog");
  this.chatService.addGroup(this.addGroupForm.value).subscribe(async data=>{
    if(data.success){
        console.log("new group is ", data);
        const toast=await this.toastControler.create({
          message:'Group Added', 
          duration:3000, 
          color:"success", 
          showCloseButton:true 
        }); 
        toast.present();  
        // location.reload(); 
  }
  else{ 
    // console.log(data);
    const toast=await this.toastControler.create({
      message:'Group not added, try it again', 
      duration:3000, 
      color:"danger", 
      showCloseButton:true 
    }); 
    toast.present(); 
    
  } 
  this.dialogRef.close("closed");
});
}

}

