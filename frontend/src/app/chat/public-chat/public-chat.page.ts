import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from 'src/app/shared/services/dialogService/dialog-service.service';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
import { ChatserverService } from 'src/app/shared/services/chatServer/chatserver.service';
@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.page.html',
  styleUrls: ['./public-chat.page.scss'],
})
export class PublicChatPage implements OnInit {
  group_id:any[];
  groups:any[]=[];
  user=JSON.parse(localStorage.getItem('user')); 
  check: boolean;
  selectedGroup_id: any;
  constructor(private chatService:ChatServiceService, private dialogServices:DialogServiceService, private chatserverService:ChatserverService) { }

  ngOnInit() { 
    //get groups
 this.chatService.addGroup_refresh.subscribe(()=>{
  console.log("inside refresh!!!!!!!!!!");
     this.getAllGroups();
     });
this.getAllGroups();
  }

  //get all groups
private getAllGroups(){ 
  this.chatService.getGroup().subscribe(data=>{
    if(data.success){
       //  console.log("groups are ", data);
        console.log("gp is ",data.res);
       // console.log("gp ids are.... ",data.res[0]._id);
       this.group_id=data.res;
        this.groups=data.res;  
        // this.groups.push(data.res,this.lastMsg);
        console.log("group are here ",this.groups);  
  }
  else{  
    console.log("not get any group some error");
  } 
  });
 }

 // choose group
 async chooseGroup(selectGroup_name, selectGroup_id){
  // this.profileService.groupData(selectGroup_id,selectGroup_name);
  //  document.getElementById("joinGroupDialog").style.visibility="visible";
    // alert("U relly want to join this group");
    this.chatService.getGroupMembers(selectGroup_id).subscribe(
      (res)=>{
        console.log("get members are",res);
        for(let i=0;i<res.res[0].participants.length;i++){
          // console.log("######### ",res.res[0].participants[i].member);
          if(this.user.id === res.res[0].participants[i].member){
              // console.log("gp id is match  ", res.res[0].participants[i],"=", this.user.id);
             this.check=true;
            }  
        } 
        if(this.check){
          console.log("hai");
          this.check=false;
          console.log("slected group is", selectGroup_id," user is ", this.user.id," username is ",this.user.username);
          console.log("allotment tag...");
          this.chatserverService.joinGroups(this.user.username,selectGroup_id,selectGroup_name);
            
          
          this.selectedGroup_id=selectGroup_id;
          this.selectedGroup_id= selectGroup_name;
          console.log("end .....");
         }else{
          // this.dialogServices.joinConfirmDialog(selectGroup_id);
         console.log("nhi hai ");
         }
      })

   if(this.dialogServices.joinConfirm_result === "closed"){
    //  this.dialogClosed=false; 
     console.log("dialog closed....");
    console.log("joinConfirm_result is closed",this.dialogServices.joinConfirm_result);
   }

}
  // choose group end


  openDialog(){
    this.dialogServices.addGroupDialog();
    // console.log("addGroupbtn hai",this.chatService.addGroupbtn);
  } 
}
 