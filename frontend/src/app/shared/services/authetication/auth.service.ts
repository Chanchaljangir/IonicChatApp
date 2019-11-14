import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
// // import { CookieService } from 'ngx-cookie-service';
// import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  authToken:any;
  user:any;
  // url = environment.url;
  constructor(private http:HttpClient) { }
  // for registeration
  registerUser(user):Observable<any>{
    let headers =new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/signup',user,{headers:headers})
    .pipe(map(res=>res));
  } 

    // store data in local storage fr guards
    storeUserData(token, user) {

      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user; 
      // console.log(this.authToken, this)
    }

  // for login 
  AuthLogin(userauth):Observable<any>{  
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/authenticate',userauth,{headers:headers})
  .pipe(map(res=>res));
  }

  //for auth guard check token avalibility
  logedIn():Boolean{
    // console.log("loggedin", this.authToken);
    var token=this.getToken();
    // console.log("token", token);
    if(token){
      return true;
    }
   return false;
  }
  getToken() {
    return localStorage.getItem('id_token');
  }
//for 1 time online 
  // AuthLogin(userauth):Observable<any>{ 
  //   let headers=new HttpHeaders();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://172.21.177.138:3000/api/authenticate',userauth,{headers:headers})
  // .pipe(map(res=>res));
  // }

}
