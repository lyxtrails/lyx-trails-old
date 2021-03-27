import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { CSWebDevComponent } from './computer_science/cs.webDev.component';
import { CSAppDevComponent } from './computer_science/cs.appDev.component';
import { CSAIComponent } from './computer_science/cs.ai.component';
import { CSMLComponent } from './computer_science/cs.ml.component';
import { LanguageComponent } from './language/language.component';
import { LangJPComponent } from './language/japanese.component';
import { LangENComponent } from './language/english.component';
import { LangCHComponent } from './language/chinese.component';
import { GameListComponent } from './game/list.component';
import { GameGuideComponent } from './game/guide.component';
import { RE7Component } from './game/guide/re7.component';
import { GameResourceComponent } from './game/resource.component';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './not-found.component';
import { MainPipe } from './pipes.module'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MainPipe,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    CSWebDevComponent,
    CSAppDevComponent,
    CSAIComponent,
    CSMLComponent,
    LanguageComponent,
    LangJPComponent,
    LangENComponent,
    LangCHComponent,
    GameComponent,
    GameListComponent,
    GameGuideComponent,
    RE7Component,
    GameResourceComponent,
    PageNotFoundComponent,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
