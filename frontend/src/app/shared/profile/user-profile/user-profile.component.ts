import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProfileServiceService } from '../../services/profile/profile-service.service';
import { AuthService } from '../../services/authetication/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  passwordForm: FormGroup;
  ImgForm: FormGroup;
  submitted=false;
  selectedFile: File;
  image: any;
  IMG: void;
  apikey: string;
  onSuccess: (res: any) => void;
  onError: (err: any) => void;
  uploadFileUrl: any;
  // url: SafeResourceUrl;
  constructor(private profileService:ProfileServiceService, private _location: Location, private authService:AuthService,
     private router:Router, private fb:FormBuilder, private toastControler:ToastController ) { }

  ngOnInit() {
     // auth guard
     if(this.authService.logedIn){
       console.log("auth works....");
      this.router.navigate(['profile']);
    }

    this.userProfileForm = new FormGroup({

      'username' : new FormControl(null, [Validators.required,Validators.maxLength(25)]),
      'phone' : new FormControl(null, [Validators.minLength(10),Validators.maxLength(10)]),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'location' : new FormControl(null),
      'status': new FormControl(null),
      // 'chattype': new FormControl(null)
  });
  this.passwordForm = new FormGroup({
     'password' : new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
     'repassword' : new FormControl(null,[Validators.required])
  },  {validators: this.passwordConfirming('password','repassword')});
  
  this.ImgForm= this.fb.group({
    'image':['']
  })

  // get profile data
  let user=JSON.parse(localStorage.getItem('user'));
  // console.log("user id is: ",user.id);

 this.profileService.getUserProfile(user.id).subscribe(data=>{
   if(data.success){ 
    console.log("data:  ",data);
    this.image=data.res[0].image
    console.log("image is ",this.image);
    // console.log("data",data.res[0].email);

    // set signup data into textbox
        this.userProfileForm.patchValue({   
          'username':data.res[0].username,
          'phone':data.res[0].phone,
          'email': data.res[0].email,
          'location':data.res[0].location,
          'status':data.res[0].status,
          'image':data.res[0].image
          // 'chattype':data.res[0].chattype
        });
   }
   else{
     console.log("data not fetch some error");
   }
  });  
 //file upload
 this.apikey='AIhZCnMbfQad5qVzGugYuz';
 this.onSuccess = (res) => console.log('###onSuccess', res);
 this.onError = (err) => console.log('###onErr', err);
  }//OnInIt end


 //Confirm Password
 passwordConfirming(password: string, repassword: string){
  return(group: FormGroup):{[key: string]: any}=>{
    let pass= group.controls[password];
    let cnfpass= group.controls[repassword];
    if(pass.value !== cnfpass.value){
      return{
       passwordConfirming: true
      };
    }
    return null;
  }
}
  get f() { return this.userProfileForm.controls; }
  get p() { return this.passwordForm.controls; }
  
  SubmitProfileForm(){ 
    this.submitted=true;
  
    if (this.userProfileForm.invalid) {
      console.log("@@@@@@@@@@@@@@@@@@@@@");
      return;
  } 
  else{
    
    let user=JSON.parse(localStorage.getItem('user'));
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", this.userProfileForm.value);
    this.profileService.updateUserProfile(this.userProfileForm.value,user.id).subscribe(async data=>{
      console.log("data submitting.........");
      if(data.success){ 
        console.log("updated data is: ",data);
        const toast=await this.toastControler.create({
          message:'Data is submitted successfully', 
          duration:3000, 
          color:"success", 
          showCloseButton:true 
        }); 
        toast.present(); 
       }else{
          console.log("not send");
          const toast=await this.toastControler.create({
            message:'Data not submited', 
            duration:3000, 
            color:"success", 
            showCloseButton:true 
          }); 
          toast.present(); 
          } 
    });
  }
  } 
 passwordSubmitForm(){ 
  this.submitted=true;
      // stop here if form is invalid
      if(this.passwordConfirming){
        alert("Password and Re-Type password must match");
      }
  if (this.passwordForm.invalid) {
    return;
}
else{
  let user=JSON.parse(localStorage.getItem('user'));
  this.profileService.updateUserProfile(this.passwordForm.value,user.id).subscribe(async data=>{
    console.log("vjhbjbj");
    if(data.success){ 
      console.log("updated data is: ",data);
      const toast=await this.toastControler.create({
        message:'Password is changed successfully', 
        duration:3000, 
        color:"success", 
        showCloseButton:true 
      }); 
      toast.present(); 
         }else{
        console.log("not send");
        const toast=await this.toastControler.create({
          message:'Password not changed', 
          duration:3000, 
          color:"success", 
          showCloseButton:true 
        }); 
        toast.present(); 
       } 
  });
}
}

//go back to chat
goBack(){  
  this._location.back(); 
}

//select Image
onFileSelected(event){
  console.log("event", event);
  // this.selectedFile= event.target.files[0];
  // this.ImgForm.get('image').setValue(this.selectedFile.name);
  this.selectedFile = event.target.files[0]
  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  console.log("image is ", event.target.result);
  reader.onload = (event) => {
   this.image = (<FileReader>event.target).result;
  //  console.log("image file ", this.image );
 };
}

onUplaodImage(){
  let user=JSON.parse(localStorage.getItem('user'));
  

  const formData= new FormData();
  formData.append('image',this.ImgForm.get('image').value);
  console.log("uplaod img works", this.ImgForm.value);
  this.profileService.uploadImage(user.id,this.ImgForm.value).subscribe(data=>{
    console.log("image uplaod");
    if(data.success){
      console.log("image data is ", data);}
    else{
      console.log("image put error");
    }
  });
}


//file upload using filestack
// onUploadSuccess(res) {
//   let user=JSON.parse(localStorage.getItem('user'));
//   console.log('###uploadSuccess', res);
//   // console.log("split  ",res.filesUploaded[0].filename);
//   // let ext=res.filesUploaded[0].filename;
//   this.uploadFileUrl=res;
//   this.uploadFileUrl=this.uploadFileUrl.filesUploaded[0].url;
//   console.log("uploaded file ",this.uploadFileUrl);
//   this.profileService.uploadImage(user.id,{'image':this.uploadFileUrl}).subscribe(data=>{
//     console.log("image uplaod");
//     if(data.success){
//       console.log("image data is ", data);}
//     else{
//       console.log("image put error");
//     }
//   });
// }

onUploadError(err: any) {
  console.log('###uploadError', err);
}
}


 