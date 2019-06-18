import { NgModule }       from '@angular/core';

import { GameListComponent }     from './list.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  imports: [
    AngularFireDatabaseModule,
  ],
  declarations: [
    GameListComponent
  ],
  providers: []
})
export class GameListModule {}
