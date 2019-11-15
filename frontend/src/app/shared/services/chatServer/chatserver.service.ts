
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
// import {map} from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root'
})
export class ChatserverService {
private socket = io("http://localhost:3000");
  constructor(private http:HttpClient) { }
  ngOnInit(){

  } 
joinGroup(user,group){
  console.log("joinGroup fun", group);
  this.socket.emit('new_joinee',{
    name:user,
    group:group
  })
}
//join for public chat
  joinGroups(user,group_id,group_name){
    console.log("joinGroup fun", group_id);
    this.socket.emit('new_joinee',{
      name:user,
      group_id:group_id,
      group_name:group_name
    })
  }

  //other person listing to new joining
  joinNewGroup(){
    let observable= new Observable((observe)=>{
      this.socket.on('new user join',(data)=>{
          observe.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    return observable;
  }

//leave group
leaveGroup(user,group_id,group_name){
  // this.socket.emit('leave group',data);
  console.log("group leave", group_id);
  this.socket.emit('leave group',{
    name:user,
    group_id:group_id,
    group_name:group_name
  });
}
//other person listing user left group
userLeftGroup(){
  let observable= new Observable((observe)=>{
    this.socket.on('left group',(data)=>{
        observe.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}

  //send any msg or start chat
  sendAnyMessage(user_id,msg,group_id,msgType){
    this.socket.emit('chatting',{
      user_id:user_id,
      msg:msg,
      group_id:group_id,
      msgType:msgType
    });
  }
  
//start user chat on server new message
startChat(){
  let observable= new Observable((observe)=>{
    this.socket.on('typing',(data)=>{
      console.log("typing service works....");  
      observe.next(data);
    });
    this.socket.on('newMessage',(data)=>{
      console.log("start chatting ",data);
        observe.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}
//typing msg
typeUser(user_name,group_id,user_id,textvalue){
  console.log("fri gp is ",group_id);
  this.socket.emit('typing',{
    user_username:user_name,
    group_id:group_id,
    user_id:user_id,
    check:textvalue
  });
}
showTypeMsg(){
  console.log("show worksd....");
  let observable= new Observable((observe)=>{
    this.socket.on('type',(data)=>{
      // console.log("type user is ",data);
      observe.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}

//private chat start

//join for public chat
// selectedFri(user,fri_id,fri_name){
//   console.log("selected_fri ", fri_id);
//   this.socket.emit('selected_fri',{
//     name:user,
//     fri_id:fri_id,
//     fri_name:fri_name
//   })
// }

  //send private any msg or start chat
  sendPrivateMessage(user_id,msg,Fri_id,msgType){
    this.socket.emit('privateChatting',{
      user_id:user_id,
      msg:msg,
      toUser:Fri_id,
      msgType:msgType
    });
  }

  startPrivateChat(){
    let observable=new Observable((observe)=>{
      this.socket.on('privateChatMsg',(data)=>{
        console.log("start chatting ",data);
          observe.next(data);
      });
      return()=>{this.socket.disconnect();}
    });
    console.log("private chat service..........");
    return observable;
  }
//typing msg
privateTypeUser(user_name,fri_id,user_id,textvalue){
  console.log("fri gp is ",fri_id);
  this.socket.emit('privatetyping',{
    user_username:user_name,
    fri_id:fri_id,
    user_id:user_id,
    check:textvalue
  });
}
privateShowTypeMsg(){
  console.log("show worksd....");
  let observable= new Observable((observe)=>{
    this.socket.on('privatetype',(data)=>{
      // console.log("type user is ",data);
      observe.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}

}
