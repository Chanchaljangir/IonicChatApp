
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map,tap} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PrivateChatServiceService {

  constructor(private http:HttpClient) { }
  private _getParticularReq= new Subject<void>();

get getParticularReq_refresh(){
  console.log("inside service refresh");
  return this._getParticularReq;
}
//get Users
getUsers():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getusers',{headers:headers})
.pipe(map(res=>res));
}
// save odd chats
addChat(msgList):Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/chatting',msgList,{headers:headers})
.pipe(map(res=>res));
}
//get odd chat
getChat():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getchat',{headers:headers})
.pipe(map(res=>res));
}

private _addGroup = new Subject<void>();
private _leaveGroup = new Subject<void>();

get addGroup_refresh(){
  console.log("inside service refresh%%%%%%%%%%%");
  return this._addGroup,this._leaveGroup;
}
// new Group Created
addGroup(groupName):Observable<any>{ 
    // this.addGroupbtn=true;
    // console.log("this.addGroupbtn ", this.addGroupbtn);
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/addgroup',groupName,{headers:headers})
    .pipe(
      tap(()=>{
        this._addGroup.next();
      })
    );
  }

  //get groups
getGroup():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getgroup',{headers:headers})
.pipe(map(res=>res));
}

//addParticipant in group
addParticipant(group_id,user_id):Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/addMembers/'+group_id,user_id,{headers:headers})
.pipe(map(res=>res));
}

//get particular Group Members
getGroupMembers(id):Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getGroupMembers/'+id,{headers:headers})
.pipe(map(res=>res));
}

//put last msg
lastMsgPatch(group_id,msg){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/putlastmsg/'+group_id,msg,{headers:headers}).toPromise();
}

//logout
logout()
{
  localStorage.removeItem('id_token');
  localStorage.removeItem('user');
  localStorage.clear();
}
//delete whole group chat
deleteChat(group_id){
  console.log("delete chat serveice",group_id);
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.delete('http://localhost:3000/api/deletechat/'+group_id,{headers:headers}).toPromise();
}
//leave Group
leaveGroup(group_id,user_id):Observable<any>{
  console.log("chat service say user leave gp");
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/leaveGroup/'+group_id,user_id,{headers:headers})
  .pipe(
    tap(()=>{
      this._leaveGroup.next();
    })
  );
}
sendConnectRequest(reqToFri):Observable<any>{
  console.log("chat service say user leave gp");
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/api/sendrequest/',reqToFri,{headers:headers})
  .pipe(
    tap(()=>{
      this._getParticularReq.next();
      this._getRequests.next();
    })
  );
}
getFriRequset(selectedFri_id){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getFrireq/'+selectedFri_id,{headers:headers}).toPromise();
}
getRequset():Observable<any>{
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getRequest/',{headers:headers})
  .pipe(map(res=>res));
}
private _getRequests = new Subject<void>();

get getRequests_refresh(){
  console.log("inside service refresh");
  return this._getRequests;
}
acceptReq(friend_id,user_id):Observable<any>{
  console.log("chat service say request accepted ",user_id);
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/acceptReq/'+friend_id,user_id,{headers:headers})
  .pipe(
    tap(()=>{
      this._getRequests.next();
    })
  );
}

notification(notification_data){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/notification/',notification_data,{headers:headers}).toPromise();
}

putNotification(user_id,notification_data){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/putnotification/'+user_id,notification_data,{headers:headers}).toPromise();
}
getNotification(){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getNotification/',{headers:headers}).toPromise();
}
private _deleteNotification = new Subject<void>();
get getNotification_refresh(){
  console.log("inside notification service refresh");
  return this._deleteNotification;
}
deleteNotification(friend_id):Observable<any>{
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch('http://localhost:3000/api/deletenotification/',friend_id,{headers:headers})
  .pipe(
    tap(()=>{
      this._deleteNotification.next();
    })
  );
}

//get Users
getAllUsers(){ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/api/getusers',{headers:headers}).toPromise()
}

}
