import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { AuthService } from 'src/app/shared/services/authetication/auth.service';
// import { ToastOptions } from '@ionic/core';
// import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  toastOption: ToastOptions;
  loginRegisterForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router, private toastControler:ToastController) { }

  ngOnInit() {
    this.loginRegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }); 
  }
  onSubmit() {
    this.authService.AuthLogin(this.loginRegisterForm.value).subscribe(async (data)=>{
      if(data.success){
        console.log("login data... ",data);
        this.authService.storeUserData(data.token,data.user);
      const toast=await this.toastControler.create({
        message:'You are successfully logIn',
        duration:3000,
        color:"success",
        showCloseButton:true
      });
      toast.present();
        console.log(data);
        this.router.navigate(['/publicchat']);
      }
      else{
        this.toastOption={
          message:'wrong Email and Password',
          duration:3000,
          color:"danger",
          showCloseButton:true
        }
      await (await this.toastControler.create(this.toastOption)).present()
      }
    });
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
  // register() {
  //   this.authService.registerUser(this.loginRegisterForm.value).subscribe((data)=>{
  //     if(data.success){
  //       console.log(data);
  //       this.router.navigate(['./home']);
  //     }
  //   });
  // }
  goTORegisterPage(){
    this.router.navigate(['./auth/signup']);
  }
}