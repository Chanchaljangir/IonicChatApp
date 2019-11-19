import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  selectedGroup_id: any;
  selectedGroup_name: any;
  selectedFriend_id: any;
  selectedFriend_name: any;
  selectedPrivateGroup_id: any;
  selectedPrivateGroup_name: any;
  constructor(private http:HttpClient) { }

    //get user profile
    getUserProfile(id):Observable<any>{
      let headers=new HttpHeaders(); 
      headers.append('Content-Type','application-json');
      return this.http.get('http://localhost:3000/api/userprofile/'+id,{headers:headers})
      .pipe(map((res:Response)=>res));
    }
    //update user profile
    updateUserProfile(userData,id):Observable<any>{
      let headers=new HttpHeaders();
      headers.append('Content-Type','application/json');
      return this.http.put('http://localhost:3000/api/profileupdate/'+id,userData,{headers:headers})
      .pipe(map((res:Response)=>res));
    }

    // selected Group info 
    groupData(group_id, group_name){
      this.selectedGroup_id=group_id;
      this.selectedGroup_name=group_name;
      this.selectedFriend_id="";
      this.selectedFriend_name="";
      this.selectedPrivateGroup_id="";
      this.selectedPrivateGroup_name=""; 
    }
   //selected private group data
   privateGroupData(group_id,group_name){
     this.selectedPrivateGroup_id=group_id;
     this.selectedPrivateGroup_name=group_name;
     this.selectedGroup_name="";
     this.selectedGroup_id="";
     this.selectedFriend_id="";
     this.selectedFriend_name="";
   }
   //selected private users
  //  privateChatData(friend_id,friend_name){
  //   this.selectedPrivateGroup_id="";
  //   this.selectedPrivateGroup_name="";
  //   this.selectedGroup_name="";
  //   this.selectedGroup_id="";
  //   this.selectedFriend_id=friend_id;
  //   this.selectedFriend_name=friend_name;
  //  }

    //get particular Group Members
    getGroupMembers(Group_id):Observable<any>{ 
      let headers=new HttpHeaders();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/api/getGroupMembers/'+Group_id,{headers:headers})
    .pipe(map(res=>res));
}

//image uploading
uploadImage(id,image):Observable<any>{
  let headers=new HttpHeaders();
      headers.append('Content-Type','application/json');
      return this.http.patch('http://localhost:3000/api/uploadimage/'+id,image,{headers:headers})
      .pipe(map((res:Response)=>res));
}
  //get user profile for id to name convert
  getUserProfile1(id){
    let headers=new HttpHeaders(); 
    headers.append('Content-Type','application-json');
    return this.http.get('http://localhost:3000/api/userprofile/'+id,{headers:headers}).toPromise();
    // .pipe(map((res:Response)=>res));
  }

//Friends profile
    // selected friends info 
    friendsData(fri_id, fri_name){
      this.selectedFriend_id=fri_id;
      this.selectedFriend_name=fri_name; 
      this.selectedGroup_id="";
      this.selectedGroup_name="";
    }
} 


