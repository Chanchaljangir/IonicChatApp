import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatserverService } from 'src/app/shared/services/chatServer/chatserver.service';
import { MatDialog } from '@angular/material';
import { PrivateChatServiceService } from 'src/app/shared/services/chat/private-chat-service.service';
import { ProfileServiceService } from 'src/app/shared/services/profile/profile-service.service';
import { AuthService } from 'src/app/shared/services/authetication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {

  sendReqMessage: string;
  confirmReqMessage: string;
  users: any[];
  OnlineUsers:any[]=[];
  selectedFri_Name: any;
  selectedFri_id: any;
  chatForm:FormGroup; 
  msg: String;
  msgList:any[]=[]; 
  getSelectedFriReq: any[]=[];
  check: boolean;
  receiveReq: any[]=[];
  textareaVisible: boolean;
  getmsg: any[];
  newMsgNumber:any[]=[];
  getNotification:any[];
  msgseen:boolean;
  timeIntervalStop:any;
  istype: boolean;
  textValue:'';
  typeUser:any;
  typemsg: any;
  checkType: any;
  typingfri_id: any;
  apikey: string;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
  uploadFileUrl: any;
  splitted: any;
  url: SafeResourceUrl;
  showEmojiPicker = false;

   constructor(private chatcommService:ChatserverService, private chatService:PrivateChatServiceService, private router:Router,
    private profileService:ProfileServiceService, private authService: AuthService) { }
  user=JSON.parse(localStorage.getItem('user'));
  
//   public sampleMethodCall() {
//     let that = this;
//     setInterval(() => {
//       console.log("set time interval");
//       that.getNotifications() 
//     }, 1000); 
//  }

  async ngOnInit() { 

    this.timeIntervalStop=false;
    let that = this;
    this.timeIntervalStop=setInterval(() => {
      console.log("set time interval");
      that.getNotifications();
      this.getAllUsers(); 
      this.getAllRequset();
    }, 7000);

    document.getElementById("chatBlock").style.visibility="hidden";
    document.getElementById("chatHeader").style.visibility="hidden";
    document.getElementById("groupinfoBlock").style.visibility="visible";
    document.getElementById("gpnameHeader").style.visibility="visible";

    this.check=false;
    this.msgseen=true;
    this.chatForm = new FormGroup({
      'msg' : new FormControl(null)  
  }); 

//get users
this.getAllUsers();

//getOnline users
// let allOnlineUsers= await this.authService.getOnlineUsers();
// this.OnlineUsers=allOnlineUsers['res'];
// console.log("this.OnlineUsers are ",this.OnlineUsers);
//start chat
this.chatcommService.startPrivateChat().subscribe(
  (res)=>{
    // console.log('user start chat $$$$$$$$$$$$',res);
   //  console.log('user start chat ',res.user);
    this.msgList.push(res);
    console.log("msg list is.......", this.msgList);
    // this.newMsgNumber.push({'toUser':this.msgList[0].toUser,'user_id':this.msgList[0].user_id,'length':this.msgList.length});
    // console.log("newMsgNumber is.......", this.newMsgNumber);
  },);

//get all request
this.chatService.getRequests_refresh.subscribe(()=>{
  console.log("inside refresh!!!!!!!!!!");
     this.getAllRequset();
     });
this.getAllRequset();


this.chatService.getChat().subscribe(data=>{
  if(data.success)
  {  
    this.getmsg=data.res;
    console.log("get msg is ", this.getmsg);
   }
}); 

//get all notification
this.chatService.getNotification_refresh.subscribe(()=>{
  this.getNotifications();
});
this.getNotifications();
  }
// end OnInit

//show which user start typin
type(){
  console.log("type call");
  this.chatcommService.privateShowTypeMsg().subscribe((data)=>{
    console.log("type msg data is ", data);
    this.typeUser=data;
    this.typemsg=this.typeUser.msg;
    this.typingfri_id=this.typeUser.user_id;
    this.checkType=this.typeUser.check;
  }) 
}
//get users
private getAllUsers(){
  this.chatService.getUsers().subscribe(data=>{
   if(data.success){
       // console.log("users are ", data);
       // console.log("user is ",data.res[0].groupName); 
       this.users=data.res;  
       console.log("users are ",this.users);
 }
 else{ 
   console.log("not get any user some error");
 } 
 });
   }

//get all request
private getAllRequset(){
  this.chatService.getRequset().subscribe((data)=>{
    console.log("get req from user ",data);
    this.receiveReq=data.res;
    console.log("this.receiveReq ",this.receiveReq[0]);
  })}
//get all notification
private async getNotifications(){
  let getNotification=await this.chatService.getNotification();
  this.getNotification=getNotification['res'];
  console.log("getnoti",getNotification['res']);
  }

//select friend
   async chooseUser(fri_name, fri_id){
     this.check=false;
     this.textareaVisible=false;
    console.log("choose user is ",fri_id);
    console.log("login user is ",this.user.id);

    this.sendReqMessage=`Request sended, wait to confirm by ${fri_name}`;
    this.confirmReqMessage=`${fri_name} want to connect you`;
    this.selectedFri_Name=fri_name;
    this.selectedFri_id=fri_id;
    // this.chatcommService.selectedFri(this.user.username,fri_id,fri_name);

// get particular friend request
this.chatService.getParticularReq_refresh.subscribe(async ()=>{
  console.log("selected fri req refreshed workd");
  let getSelectedFriReq= await this.chatService.getFriRequset(this.selectedFri_id);
  this.getSelectedFriReq=getSelectedFriReq['res'];
  console.log("fri req refreshed ",this.getSelectedFriReq);
})
let getSelectedFriReq= await this.chatService.getFriRequset(this.selectedFri_id);
this.getSelectedFriReq=getSelectedFriReq['res'];
console.log("get selected fri reqest ",this.getSelectedFriReq);
console.log("this.receiveReq in choose!!!!!!!! ",this.receiveReq);

// send connection request to friend
for(let i=0;i<this.getSelectedFriReq.length;i++){
  if(this.getSelectedFriReq[i].friend_id === this.selectedFri_id && this.getSelectedFriReq[i].user_id === this.user.id){
    this.check = true;}
}
for(let i=0;i<this.receiveReq.length;i++){
  // console.log("this.receiveReq.length ",this.receiveReq.length);
  if(this.receiveReq[i].friend_id === this.user.id && this.selectedFri_id === this.receiveReq[i].user_id){
    this.check=true;
  } 
  // if(this.receiveReq[i].status === true && (this.receiveReq[i].user_id === this.selectedFri_id || this.receiveReq[i].friend_id === this.user.id)){
    if(this.receiveReq[i].status === true && ((this.receiveReq[i].user_id === this.user.id || this.user.id === this.receiveReq[i].friend_id)
    && (this.selectedFri_id === this.receiveReq[i].friend_id || this.selectedFri_id === this.receiveReq[i].user_id))){
    console.log("this.receiveReq[i].status === true ",this.receiveReq[i].status === true);
    console.log("this.receiveReq[i].user_id ",this.receiveReq[i].user_id);
    console.log("this.receiveReq[i].friend_id ",this.receiveReq[i].friend_id);
    this.textareaVisible=true;
  }
}
if(this.check){
  console.log("id hai");
  console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
  document.getElementById("chatBlock").style.visibility="visible";
  document.getElementById("chatHeader").style.visibility="visible";
  document.getElementById("groupinfoBlock").style.visibility="hidden";
  document.getElementById("gpnameHeader").style.visibility="hidden";
  this.check=false;
}else{
  console.log("id nhi hai");
  let confirmbox= confirm("sure you want to send request");
  if(confirmbox === true){
    console.log("u want");
    this.chatService.sendConnectRequest({"user_id":this.user.id,"friend_id":this.selectedFri_id}).subscribe();
  }
}
if(this.textareaVisible){
  document.getElementById("footer").style.visibility="visible";
}
else{
  document.getElementById("footer").style.visibility="hidden";
}
this.profileService.friendsData(this.selectedFri_id,this.selectedFri_Name);

//after view notification 
console.log("this.getNotification.length ",this.getNotification.length);
  for(let i=0;i<this.getNotification.length;i++){
    if(this.getNotification[i].toUser===this.user.id && this.getNotification[i].fromUser===this.selectedFri_id){
      this.chatService.deleteNotification({'fromUser':this.selectedFri_id,'toUser':this.user.id}).subscribe((data)=>{
      console.log("delete notification...........",data);})
      // this.msgseen=false;
    }
  }
  this.type();
}//select friend end..


//send message by click on send button
async sendMessage(){ 
  console.log("send btn work time");
  let addNotification=true;
  console.log("out of addNotification ",addNotification);
    console.log("send btn works...", this.msg,"user ",this.user.id,"fri ",this.selectedFri_id);
    this.chatcommService.sendPrivateMessage(this.user.id,this.msg,this.selectedFri_id,'textMsg');
    let getNotifications=await this.chatService.getNotification();
    // for(let i=0;i<getNotifications['res'].length;i++){
    //   if(!((getNotifications['res'][i].fromUser === this.user.id) && (getNotifications['res'][i].toUser===this.selectedFri_id))){
    //     addNotification=true;
    //     console.log("addNotification in if ",addNotification);
    //     }
    //   else{
    //     console.log("put noti works");
    //     await this.chatService.putNotification(this.user.id,{'toUser':this.selectedFri_id});
    //     addNotification=false;
    //     console.log("addNotification ",addNotification);
    //     }
    // }
    for(let i=0;i<getNotifications['res'].length;i++){
      if((getNotifications['res'][i].fromUser === this.user.id) && (getNotifications['res'][i].toUser===this.selectedFri_id)){
        addNotification=false;
        console.log("addNotification in if ",addNotification);
        }
      }
    if(addNotification){
      console.log("addNotification why alwyas work ",addNotification);
      console.log("new noti works");
      await this.chatService.notification({'fromUser':this.user.id,'toUser':this.selectedFri_id,'notification':1});    
    addNotification=false;
    }
    else{
      console.log("put noti works");
        await this.chatService.putNotification(this.user.id,{'toUser':this.selectedFri_id});
        addNotification=false;
        console.log("addNotification ",addNotification);
    }
  }//send btn end...

 
// onUploadSuccess(res) {
//   let abc:any;
//   console.log('###uploadSuccess', res);
//   console.log("split  ",res.filesUploaded[0].filename);
//   let ext=res.filesUploaded[0].filename;
//   this.splitted = ext.split("."); 
// console.log("after split ",this.splitted[1]);
//   this.uploadFileUrl=res;
//   console.log("this.uploadFileUrl=res ",this.uploadFileUrl);
//   abc=this.uploadFileUrl.filesUploaded[0].handle;
//   console.log("abc is ",abc);
//   this.uploadFileUrl='https://cdn.filestackcontent.com/cache=false/'+abc;
//   console.log("after uploaded image is........ ",this.uploadFileUrl);
//   if(this.selectedFri_id){
//     console.log("send btn works...", this.selectedFri_id);
//     this.chatcommService.sendPrivateMessage(this.user.id,this.uploadFileUrl,this.selectedFri_id,this.splitted[1]);
//   }
// }
// onUploadError(err: any) {
//   console.log('###uploadError', err);
// }

//typing message / check teztArea empty or not 
textAreaEmpty(){
  if (this.textValue != '') {
    console.log("this.textValue *********** ",this.textValue);
    this.istype=true;
    this.chatcommService.privateTypeUser(this.user.username,this.selectedFri_id,this.user.id,this.istype);
    this.type();
  }
  else{
    this.istype=false;
    this.chatcommService.privateTypeUser(this.user.username,this.selectedFri_id,this.user.id,this.istype);
      console.log("this.textValue @@@@@@@@@@@@@ ",this.textValue);
    }
}
  //send message my pass enter key
  async keyDownFunction(event) {
    // console.log("what is event ",event);
    if(event.keyCode == 13) {
      console.log("send btn work time");
  let addNotification=true;
  console.log("out of addNotification ",addNotification);
    console.log("send btn works...", this.msg,"user ",this.user.id,"fri ",this.selectedFri_id);
    this.chatcommService.sendPrivateMessage(this.user.id,this.msg,this.selectedFri_id,'textMsg');
    let getNotifications=await this.chatService.getNotification();
    for(let i=0;i<getNotifications['res'].length;i++){
      if((getNotifications['res'][i].fromUser === this.user.id) && (getNotifications['res'][i].toUser===this.selectedFri_id)){
        addNotification=false;
        console.log("addNotification in if ",addNotification);
        }
      }
    if(addNotification){
      console.log("addNotification why alwyas work ",addNotification);
      console.log("new noti works");
      await this.chatService.notification({'fromUser':this.user.id,'toUser':this.selectedFri_id,'notification':1});    
    addNotification=false;
    }
    else{
      console.log("put noti works");
        await this.chatService.putNotification(this.user.id,{'toUser':this.selectedFri_id});
        addNotification=false;
        console.log("addNotification ",addNotification);
    }
          let textMsg=(document.getElementById('msgTextarea') as HTMLTextAreaElement).value="";
      }
  }

  backButtonPressed(){
    document.getElementById("chatBlock").style.visibility="hidden";
    document.getElementById("chatHeader").style.visibility="hidden";
    document.getElementById("groupinfoBlock").style.visibility="visible";
    document.getElementById("gpnameHeader").style.visibility="visible";
    console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
  }
   //view friends profile
   viewFriendProfile(){
    this.router.navigate(['friendProfile']);
   }

  //  openDialog():void {
  //    let MatDialogRef=this.dialog.open(AddGroupComponent,{
  //      data:"MyVar"
  //    })
  //    MatDialogRef.afterClosed().subscribe(result=>{
  //      console.log("dialog was closed");
  //      console.log("dialog result is",result);
  //    })
  //  }  
  
   //logout user
   logout(){
    this.authService.offlineUser(this.user.id).subscribe((data)=>{
      console.log("offline user ",data);
    });
    this.chatService.logout();
    this.router.navigate(['/auth/login']);
    this.timeIntervalStop=true;
    return false;
   }
   ngOnDestroy() {
    if (this.timeIntervalStop) {
      clearInterval(this.timeIntervalStop);
    }
  }
//view profile
  viweProfile()
  {
    this.router.navigate(['userProfile']);
  }

//confirm firend Request
  confirmReqbtn(){
    this.chatService.acceptReq(this.selectedFri_id, {"friend_id":this.user.id}).subscribe((data)=>{
      if(data){
        console.log("accept hai");
        document.getElementById("footer").style.visibility="visible";
        document.getElementById("confirm_iddiv").style.display="none";
      }
      else{
        console.log("not accept");
      }
    })
  }
// mimetype: "text/plain"
// downloaddoc(response) {
//   console.log("responce@@@@@@@@@@@@ ",response);
//   const blob = new Blob([response.data], { type:'application/pdf'});
//   console.log("blob$$$$$$$$$$$$$$$ ",blob);
//   const url= URL.createObjectURL(blob);
//   console.log("url is!!!!!!!!!!!!!!!! ",url);
//   // window.open(url);
//   saveAs(url, "down.pdf");
// }
// downloadImg(data){ 
//   console.log("image download");
//   // console.log("responce@@@@@@@@@@@@ ",response);
//   // const blob = new Blob([response.data], { type:'image/jpg'});
//   // console.log("blob$$$$$$$$$$$$$$$ ",blob);
//   // const url= URL.createObjectURL(blob);
//   // console.log("url is!!!!!!!!!!!!!!!! ",url);
//   // // window.open(url);
//   // saveAs(blob, "down.jpg");
  
//   var theJSON = JSON.stringify(data);
//   var uri = this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;charset=UTF-8," + encodeURIComponent(theJSON));
//   console.log("uri ",uri);
// }
// openDocument(url){
//   console.log("open document in new window ",url);
//   window.open(url);
// }

// emoji(msgTextarea){
//   putEmoji(msgTextarea);
// }
// toggleEmojiPicker() {
//   console.log("toggleEmojiPicker");
//   this.showEmojiPicker = !this.showEmojiPicker;
// }
// addEmoji(event) {
//   // const { message } = this;
//   const text = `${event.emoji.native}`;

//   // this.message = text;
//   this.textValue=text as '';
//   console.log("this mesg ",this.textValue);
//   this.showEmojiPicker = false;
// }
}
  

