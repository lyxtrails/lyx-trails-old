import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent }    from './not-found.component';
import { HomeComponent } from './home/home.component'
import { BlogComponent } from './blog/blog.component'
import { CSWebDevComponent } from './computer_science/cs.webDev.component'
import { CSAppDevComponent } from './computer_science/cs.appDev.component'
import { CSAIComponent } from './computer_science/cs.ai.component'
import { CSMLComponent } from './computer_science/cs.ml.component'
import { LangJPComponent } from './language/japanese.component'
import { LangENComponent } from './language/english.component'
import { LangCHComponent } from './language/chinese.component'
import { GameListComponent } from './game/list.component';
import { GameGuideComponent } from './game/guide.component';
import { RE7Component } from './game/guide/re7.component';
import { GameResourceComponent } from './game/resource.component';
import { LanguageComponent } from './language/language.component'
import { GameComponent } from './game/game.component'

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'cs/webDev', component: CSWebDevComponent },
  { path: 'cs/appDev', component: CSAppDevComponent },
  { path: 'cs/ai', component: CSAIComponent },
  { path: 'cs/ml', component: CSMLComponent },
  { path: 'language', component: LanguageComponent },
  { path: 'lang/en', component: LangENComponent },
  { path: 'lang/jp', component: LangJPComponent },
  { path: 'lang/ch', component: LangCHComponent },
  { path: 'game/list', component: GameListComponent },
  { path: 'game/guide', component: GameGuideComponent },
  { path: 'game/guide/re7', component: RE7Component },
  { path: 'game/resource', component: GameResourceComponent },
  { path: 'game', component: GameComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
