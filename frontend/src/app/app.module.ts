import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { AuthPageModule } from './auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { CreateGroupComponent } from './dialog-modules/create-group/create-group.component';
import { DialogServiceService } from './shared/services/dialogService/dialog-service.service';
import { DialogModulesModule } from './dialog-modules/dialog-modules.module';

// import { IconsModule } from 'src/app/icons/icons.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

  imports: [
    // AuthPageModule,
     BrowserModule, 
    //  CommonModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
    //  HttpClient,
     HttpClientModule,
     BrowserAnimationsModule,
     DialogModulesModule,
    //  NoopAnimationsModule,
     MatButtonModule, MatCheckboxModule,MatMenuModule,MatIconModule,MatDialogModule
    //  IconsModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [MatButtonModule, MatCheckboxModule,MatIconModule,MatDialogModule],
  bootstrap: [AppComponent]
})


export class AppModule {}