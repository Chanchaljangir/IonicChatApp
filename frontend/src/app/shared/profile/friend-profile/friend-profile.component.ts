import { Component, OnInit } from '@angular/core';
// import { ChatcommServiceService } from '../../services/chatcomm/chatcomm-service.service';
import { ChatServiceService } from '../../services/chat/chat-service.service';
import {Location} from '@angular/common';
import { ProfileServiceService } from '../../services/profile/profile-service.service';

@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  user: any[]=[];
  group_id: any;
  group_name: any;
  groupMembersName:any[]=[];
  groupCreatedBy:any[]=[]
  friend_name: any;
  friend_id: any;
  constructor(private chatService: ChatServiceService, private profileService: ProfileServiceService, private _location: Location) { }

  async ngOnInit() {
//groups details
    this.group_id=this.profileService.selectedGroup_id;
    this.group_name=this.profileService.selectedGroup_name;
    console.log("gp name ", this.group_name);
    this.profileService.getGroupMembers(this.group_id).subscribe(async res=>{
      if(res.success){
      console.log("res is ",res.res[0]);
      }
      let createdBy= await this.profileService.getUserProfile1(res.res[0].createdBy);
        console.log("createdBy['res'][0].username ",createdBy['res'][0].username);
        this.groupCreatedBy.push({'createdBy':createdBy['res'][0].username});
        for(let i=0;i<=res.res[0].participants.length-1;i++){
          let convert= await this.profileService.getUserProfile1(res.res[0].participants[i].member);
          this.groupMembersName.push({'memberName':convert['res'][0].username});
        }
      });
      // console.log(" this.groupCreatedBy ", this.groupCreatedBy);
      
//private group details
//groups details
this.group_id=this.profileService.selectedPrivateGroup_id;
this.group_name=this.profileService.selectedPrivateGroup_name;
console.log("private gp name ", this.group_name);
this.profileService.getGroupMembers(this.group_id).subscribe(async res=>{
  if(res.success){
  console.log("private group res is ",res.res[0]);
  }
  let createdBy= await this.profileService.getUserProfile1(res.res[0].createdBy);
    console.log("createdBy['res'][0].username ",createdBy['res'][0].username);
    this.groupCreatedBy.push({'createdBy':createdBy['res'][0].username});
    for(let i=0;i<=res.res[0].participants.length-1;i++){
      let convert= await this.profileService.getUserProfile1(res.res[0].participants[i].member);
      this.groupMembersName.push({'memberName':convert['res'][0].username});
    }
  });


  //friends details
  this.friend_name=this.profileService.selectedFriend_name;
  this.friend_id=this.profileService.selectedFriend_id;

  //get users
       let userDetails= await this.profileService.getUserProfile1(this.friend_id);
            this.user.push({'0':userDetails['res'][0]}); 
            // console.log("this.user before ",this.user); 
  }//onInIt ends...

//go back to chat
goBack(){  
  this._location.back(); 
  // this.router.navigate(['/publicchat']);
}
}
