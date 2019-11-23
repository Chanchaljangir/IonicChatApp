import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private router:Router, public loadingController: LoadingController, private navCtr: NavController
  ) { 
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => { 
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  publicChat(){
    this.router.navigate(['/publicchat']);
    // this.navCtr.navigateForward(['/publicchat'])
    this.showAutoHideLoader();
    // window.location.reload();
    // this.router.onSameUrlNavigation ='reload'
  }
  privateChat(){
    this.router.navigate(['privatechat']);
    this.showAutoHideLoader();
    // this.router.onSameUrlNavigation ='reload'
    
  }
  groupChat(){
    this.router.navigate(['groupchat']);
  }
  showAutoHideLoader() {
    
    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000,
     
    }).then((res) => {
      res.present();
      location.reload();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds');
      });
    });
  }
}
