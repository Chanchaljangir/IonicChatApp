import { Component, OnInit } from '@angular/core';
import { DialogServiceService } from 'src/app/shared/services/dialogService/dialog-service.service';
@Component({
  selector: 'app-public-chat',
  templateUrl: './public-chat.page.html',
  styleUrls: ['./public-chat.page.scss'],
})
export class PublicChatPage implements OnInit {

  constructor(private dialogServices:DialogServiceService) { }

  ngOnInit() { 
  }
  openDialog(){
    this.dialogServices.addGroupDialog();
    // console.log("addGroupbtn hai",this.chatService.addGroupbtn);
  } 
}
 