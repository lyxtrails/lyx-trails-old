import { NgModule }       from '@angular/core';

import { GameGuideModule } from './guide.module';
import { GameComponent } from './game.component';
import { GameListComponent } from './list.component';
import { GameResourceComponent } from './resource.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser'
import { DialogModule } from '../dialogs/dialog.module'

@NgModule({
  imports: [
    GameGuideModule, MatFormFieldModule, MatInputModule, BrowserModule, DialogModule
  ],
  declarations: [
    GameComponent, GameListComponent, GameResourceComponent
  ],
  providers: []
})
export class GameModule {}
