import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/authetication/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  RegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router,private toastControler:ToastController) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      username:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone:['']
    }); 
  }
  register() {
    this.authService.registerUser(this.RegisterForm.value).subscribe(async (data)=>{
      if(data.success){
        console.log(data);
        const toast=await this.toastControler.create({
          message:'You are successfully Registerd And LogIn', 
          duration:3000, 
          color:"success", 
          showCloseButton:true 
        }); 
        toast.present(); 
        this.router.navigate(['./home']); 
      }
      else{
        const toast=await this.toastControler.create({
          message:'Email is already registed',
          duration:3000,
          color:"danger",
          showCloseButton:true
        });
        toast.present();
      }
    });
  }
  goTOLoginPage(){
    this.router.navigate(['/auth/login']);
  }
}