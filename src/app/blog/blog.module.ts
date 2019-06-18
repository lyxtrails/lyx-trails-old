import { NgModule } from '@angular/core';

import { BlogComponent } from './blog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    AngularFirestoreModule,
  ],
  declarations: [
    BlogComponent
  ],
  providers: []
})
export class BlogModule {}
