import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'private-chat', loadChildren: './chat/private-chat/private-chat.module#PrivateChatPageModule' },
  { path: 'group-chat', loadChildren: './chat/group-chat/group-chat.module#GroupChatPageModule' },
  { path: 'public-chat', loadChildren: './chat/public-chat/public-chat.module#PublicChatPageModule' },
];
 console.log("app routing module@@@@@@@@@");
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

