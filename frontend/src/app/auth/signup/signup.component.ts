import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/authetication/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  role:any;
  classes=[];
 constructor(private authService:AuthService,private router:Router,private toastControler:ToastController ) { }


  ngOnInit() {
    if(this.authService.logedIn()){
      if(this.authService.getuserChattype() === 'public')
        {
        this.router.navigate(['publicchat']);}
      else{
        this.router.navigate(['privatechat']);}
    }

    this.signupForm = new FormGroup({

      'username' : new FormControl(null, [Validators.required,Validators.maxLength(25)]),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      
      'password' : new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'repassword' : new FormControl(null,[Validators.required]),
      // 'chattype': new FormControl(null,[Validators.required])
  },
  {validators: this.passwordConfirming('password','repassword')}
  );
}
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

 //on signup 
 onRegister(){
  console.log(this.signupForm.value)
  this.authService.registerUser(this.signupForm.value).subscribe(async data=>{
    if(data.success){
      this.authService.storeUserData(data.res.token,data.res.user);
        console.log("user data ", data);
        const toast=await this.toastControler.create({
          message:'You are successfully Registerd And LogIn', 
          duration:3000, 
          color:"success", 
          showCloseButton:true  
        }); 
        toast.present(); 
        this.router.navigate(['/publicchat']); 
          this.authService.putOnlineUsers(data.res.user.id).subscribe(data1=>{
            console.log("online user ",data1);
          });
  }
  else{ 
    console.log("inside else..........",data);
    const toast=await this.toastControler.create({
      message:'Email is already registed',
      duration:3000,
      color:"danger",
      showCloseButton:true
    });
    toast.present();
    this.router.navigate(['/auth/signup'])
    
  } 
});
} 
goTOLoginPage(){
  this.router.navigate(['/auth/login']);
} 
}
