import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PipeModule } from '../pipe.module'
import { BrowserModule } from '@angular/platform-browser'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    AngularFirestoreModule,
    PipeModule,
    BrowserModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    BlogComponent,
  ],
  providers: [
    DatePipe,
  ]
})
export class BlogModule {}
