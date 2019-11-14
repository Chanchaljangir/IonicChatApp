
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
// import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {

  addGroupForm:FormGroup; 
  privateGroup: any;
  constructor(public dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    // private chatService: ChatServiceService,private toastr:ToastrService
    ) { }
    
    user=JSON.parse(localStorage.getItem('user')); 
  
    ngOnInit() {
    this.addGroupForm = new FormGroup({
      'groupName' : new FormControl(null, Validators.required), 
      'createdBy': new FormControl(this.user.id),
      'date': new FormControl(Date())
  }); 
//   this.privateGroup=this.dialogService.privateGroup
//   console.log("this.privateGroup ",this.privateGroup);
}  

  close(){
    this.dialogRef.close("closed");
  }
// addGroup(){
//   console.log("addgrup call in dialog");
//   this.chatService.addGroup(this.addGroupForm.value).subscribe(data=>{
//     if(data.success){
//         console.log("new group is ", data);
//         this.toastr.success(' Group Added');  
//         // location.reload(); 
//   }
//   else{ 
//     // console.log(data);
//     this.toastr.error(' Group not Added');
    
//   } 
//   this.dialogRef.close("closed");
// });
// }

}

