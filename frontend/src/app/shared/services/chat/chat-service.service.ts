import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map,tap} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {environment} from '../../../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  url = environment.url;
  private modals: any[] = [];
  addGroupbtn: any;
  baseApiUrl: string;
  // welcomeMsg="Public Chat";
  constructor(private http:HttpClient) { }

  private _addGroup = new Subject<void>();

  get addGroup_refresh(){
    console.log("inside service refresh%%%%%%%%%%%");
    return this._addGroup;
  }
// new Group Created
  addGroup(groupName):Observable<any>{ 
      // this.addGroupbtn=true;
      // console.log("this.addGroupbtn ", this.addGroupbtn);
      let headers=new HttpHeaders();
      headers.append('Content-Type','application/json');
      return this.http.post(`${this.url}/api/addgroup`,groupName,{headers:headers})
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
  return this.http.get(`${this.url}/api/getgroup`,{headers:headers})
.pipe(map(res=>res));
}

//get Users
getUsers():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get(`${this.url}/api/getusers`,{headers:headers})
.pipe(map(res=>res));
}
// save odd chats
addChat(msgList):Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.post(`${this.url}/api/chatting`,msgList,{headers:headers})
.pipe(map(res=>res));
}

//get odd chat
getChat():Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get(`${this.url}/api/getchat`,{headers:headers})
.pipe(map(res=>res));
}
 
//logout
logout()
{
  localStorage.removeItem('id_token');
  localStorage.removeItem('user');
  localStorage.clear();
}

//addParticipant in group
addParticipant(group_id,user_id):Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch(`${this.url}/api/addMembers/`+group_id,user_id,{headers:headers})
.pipe(map(res=>res));
}

//get particular Group Members
getGroupMembers(id):Observable<any>{ 
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get(`${this.url}/api/getGroupMembers/`+id,{headers:headers})
.pipe(map(res=>res));
}

//leave Group
leaveGroup(group_id,user_id):Observable<any>{
  console.log("chat service say user leave gp");
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch(`${this.url}/api/leaveGroup/`+group_id,user_id,{headers:headers})
  .pipe(map(res=>res));
}
getLstMsg(){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.get(`${this.url}/api/lastmsg/`,{headers:headers}).toPromise();
}

//delete whole group chat
deleteChat(group_id){
  console.log("delete chat serveice",group_id);
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.delete(`${this.url}/api/deletechat/`+group_id,{headers:headers}).toPromise();
}

//put last msg
lastMsgPatch(group_id,msg){
  console.log("delete chat serveice",group_id);
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch(`${this.url}/api/putlastmsg/`+group_id,msg,{headers:headers}).toPromise();
}
putGroupNotification(user_id,notification_data){
  let headers=new HttpHeaders();
  headers.append('Content-Type','application/json');
  return this.http.patch(`${this.url}/api/patchGroupNotification/`+user_id,notification_data,{headers:headers}).toPromise();
}

//welcome Msg
// welcomeInPublicChat(){
    // this.welcomeMsg="Public Chat";
// }
//private chat //private chat //private chat //private chat //private chat //private chat //private chat
// private _getParticularReq= new Subject<void>();

// get getParticularReq_refresh(){
//   console.log("inside service refresh");
//   return this._getParticularReq;
// }

// sendConnectRequest(reqToFri):Observable<any>{
//   console.log("chat service say user leave gp");
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.post('http://localhost:3000/api/sendrequest/',reqToFri,{headers:headers})
//   .pipe(
//     tap(()=>{
//       this._getParticularReq.next();
//       this._getRequests.next();
//     })
//   );
// }
// getFriRequset(selectedFri_id){
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.get('http://localhost:3000/api/getFrireq/'+selectedFri_id,{headers:headers}).toPromise();
// }
// getRequset():Observable<any>{
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.get('http://localhost:3000/api/getRequest/',{headers:headers})
//   .pipe(map(res=>res));
// }
// private _getRequests = new Subject<void>();

// get getRequests_refresh(){
//   console.log("inside service refresh");
//   return this._getRequests;
// }
// acceptReq(friend_id,user_id):Observable<any>{
//   console.log("chat service say request accepted ",user_id);
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.patch('http://localhost:3000/api/acceptReq/'+friend_id,user_id,{headers:headers})
//   .pipe(
//     tap(()=>{
//       this._getRequests.next();
//     })
//   );
// }

// notification(notification_data){
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.patch('http://localhost:3000/api/notification/',notification_data,{headers:headers}).toPromise();
// }

// putNotification(user_id,notification_data){
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.patch('http://localhost:3000/api/putnotification/'+user_id,notification_data,{headers:headers}).toPromise();
// }
// getNotification(){
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.get('http://localhost:3000/api/getNotification/',{headers:headers}).toPromise();
// }
// private _deleteNotification = new Subject<void>();
// get getNotification_refresh(){
//   console.log("inside notification service refresh");
//   return this._deleteNotification;
// }
// deleteNotification(friend_id):Observable<any>{
//   let headers=new HttpHeaders();
//   headers.append('Content-Type','application/json');
//   return this.http.patch('http://localhost:3000/api/deletenotification/',friend_id,{headers:headers})
//   .pipe(
//     tap(()=>{
//       this._deleteNotification.next();
//     })
//   ); 
// }
DownloadFile (responce: string): Observable<Blob> {
  const options = { responseType: 'blob' as 'json' }
  return this.http.get<Blob>(this.baseApiUrl + responce, options)
}
}

 