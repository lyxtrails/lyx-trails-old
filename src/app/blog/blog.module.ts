import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PipeModule } from '../pipe.module'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [
    AngularFirestoreModule,
    PipeModule,
    BrowserModule,
  ],
  declarations: [
    BlogComponent,
  ],
  providers: []
})
export class BlogModule {}
