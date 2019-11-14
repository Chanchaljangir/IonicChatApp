import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'privatechat', loadChildren: './chat/private-chat/private-chat.module#PrivateChatPageModule' },
  { path: 'groupchat', loadChildren: './chat/group-chat/group-chat.module#GroupChatPageModule' },
  { path: 'publicchat', loadChildren: './chat/public-chat/public-chat.module#PublicChatPageModule' },
];
 console.log("app routing module@@@@@@@@@");
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

