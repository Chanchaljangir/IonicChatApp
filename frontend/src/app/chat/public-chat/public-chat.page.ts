import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from 'src/app/shared/services/dialogService/dialog-service.service';
import { ChatServiceService } from 'src/app/shared/services/chat/chat-service.service';
import { ChatserverService } from 'src/app/shared/services/chatServer/chatserver.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
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
  selectedGroup_name: any;
  
  // user: string="";
  joinList:any[]=[]; 
  msgList:any[]=[]; 
  userMsglist:any[]=[];
  msg:String;
  users:any[]; 
  checkGpAvaliabl=false;
  chatForm:FormGroup; 
  leaveGroupForm:FormGroup;
   getmsg: any[]=[];
  filterText: any;
  convertIdByUser: any[];
  lastMsg: any[]=[];
  selectedFriend_id=String;
  selectedFriend_name: any;
  // emoji: any;
  typeUser:any;
  textValue:'';
  message:any;
  typemsg: any;
  typeGroup_id: any;
  typingGroup_id: any;
  typingUser_id: any;
  // getNotification:any[];
  // msgseen:boolean;
  apikey: string;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
  uploadFileUrl: any;
  splitted: any;
  url: SafeResourceUrl;
  istype: boolean;
  checkType: any;
  app_secret: string;
  showEmojiPicker = false;
  constructor(private chatService:ChatServiceService, private dialogServices:DialogServiceService, private chatserverService:ChatserverService) { }

  async ngOnInit() { 
    document.getElementById("chatBlock").style.visibility="hidden";
    document.getElementById("chatHeader").style.visibility="hidden";
    document.getElementById("groupinfoBlock").style.visibility="visible";
    document.getElementById("gpnameHeader").style.visibility="visible";
    this.check=false;
    //get groups
 this.chatService.addGroup_refresh.subscribe(()=>{
  console.log("inside refresh!!!!!!!!!!");
     this.getAllGroups();
     });
this.getAllGroups();


this.check=false;
this.chatForm = new FormGroup({
   'msg' : new FormControl(null)  
}); 
this.leaveGroupForm = new FormGroup({
'participants': new FormControl(this.user.id) 
});

//join new group
 this.chatserverService.joinNewGroup().subscribe(
   (res)=>{
     console.log('Server response is ',res);
     this.joinList.push(res);
   }, 
   (err)=>{
     console.log('server err is ',err);
   }
 ); 

 //start chat
 this.chatserverService.startChat().subscribe(
   (res)=>{
     console.log('user start chat ',res);
    //  console.log('user start chat ',res.user);
    //  this.profileService.getUserProfile(res.user).subscribe(
    //    (data)=>{
    //      this.convertIdByUser=data.res[0].username;
    //    }
    //  )
     this.msgList.push(res);
     console.log("msg list is.......", this.msgList);
  }, 
   (err)=>{ 
     console.log('chat err is ',err);
   });

//get odd chat
this.chatService.getChat().subscribe(async data=>{
 if(data.success)
 {  
   console.log("get msg is ", this.getmsg)
  }
  for(let i=0; i<data.res.length;i++)
  {
  //  let covertID= await this.profileService.getUserProfile1(data.res[i].fromUser);  
      // this.getmsg.push({'username':covertID['res'][0].username,'image':covertID['res'][0].image,'0':data.res[i]})
      this.getmsg.push({'0':data.res[i]})
   
  } 
  console.log("getmsg 1 is ", this.getmsg);
}); 

//left group
 this.chatserverService.userLeftGroup().subscribe(      
   (res)=>{
   console.log('user leave the group... ',res);
   this.joinList.push(res); 
 },
 (err)=>{
   console.log('user leave err: ',err);
 })
// get last message
let lastmsg=await this.chatService.getLstMsg();
console.log("data$$$$ ",lastmsg['res']);
this.lastMsg=lastmsg['res'];
console.log("last msg function ", this.lastMsg);

//get groups
this.chatService.addGroup_refresh.subscribe(()=>{
console.log("inside refresh!!!!!!!!!!");
  this.getAllGroups();
  });
this.getAllGroups();


console.log("cureent user is ",this.user.id);



//check group avaliablibility
if(this.selectedGroup_id){
this.checkGpAvaliabl=true;
}

//start public user chat
this.chatserverService.startPrivateChat().subscribe(
(res)=>{
// console.log('user start chat $$$$$$$$$$$$',res);
//  console.log('user start chat ',res.user);
this.userMsglist.push(res);
console.log("msg list is.......", this.userMsglist);

}); 

  }
//end OnInIt

type(){
  this.chatserverService.showTypeMsg().subscribe((data)=>{
    console.log("type msg data is ", data);
    this.typeUser=data;
    this.typemsg=this.typeUser.msg;
    this.typingGroup_id=this.typeUser.group_id;
    this.checkType=this.typeUser.check;
  }) 
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
    console.log("selected gp name is ", selectGroup_name," and id is ", selectGroup_id);
    this.selectedGroup_id=selectGroup_id; //########
    this.selectedGroup_name= selectGroup_name; //#########
    
   

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
          document.getElementById("chatBlock").style.visibility="visible";
          document.getElementById("chatHeader").style.visibility="visible";
          document.getElementById("groupinfoBlock").style.visibility="hidden";
          document.getElementById("gpnameHeader").style.visibility="hidden";
          console.log("hai");
          this.check=false;
          console.log("slected group is", selectGroup_id," user is ", this.user.id," username is ",this.user.username);
          console.log("allotment tag...");
          this.chatserverService.joinGroups(this.user.username,selectGroup_id,selectGroup_name);
            
          
          this.selectedGroup_id=selectGroup_id;
          this.selectedGroup_name= selectGroup_name;
          console.log("end .....");
         }else{
          this.dialogServices.joinConfirmDialog(selectGroup_id);
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

//send message by press send key
async sendMessage(){ 
  if(this.selectedGroup_id){
     console.log("send btn works...", this.selectedGroup_id);
     this.chatserverService.sendAnyMessage(this.user.id,this.msg,this.selectedGroup_id,'textMsg');
     let lmsg=await this.chatService.lastMsgPatch(this.selectedGroup_id,{"msg":this.msg});
     console.log("lmsg  ", lmsg);
  }
}
  openDialog(){
    this.dialogServices.addGroupDialog();
    // console.log("addGroupbtn hai",this.chatService.addGroupbtn);
  } 

  backButtonPressed(){
    document.getElementById("chatBlock").style.visibility="hidden";
    document.getElementById("chatHeader").style.visibility="hidden";
    document.getElementById("groupinfoBlock").style.visibility="visible";
    document.getElementById("gpnameHeader").style.visibility="visible";

  }
}
 