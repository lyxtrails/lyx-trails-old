import { NgModule }       from '@angular/core';

import { GameGuideComponent }     from './guide.component';
import { RE7GuideComponent }     from './guides/re7.component';

import { PipeModule } from '../pipe.module'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [
    PipeModule,
    BrowserModule,
  ],
  declarations: [
    GameGuideComponent, RE7GuideComponent
  ],
  providers: []
})
export class GameGuideModule {}
