import { NgModule } from '@angular/core';

import { LanguageComponent } from './language.component';
import { LangJPComponent } from './japanese.component';
import { LangENComponent } from './english.component';
import { LangCHComponent } from './chinese.component';
import { PipeModule } from '../pipe.module'

@NgModule({
  imports: [
    PipeModule,
  ],
  declarations: [
    LanguageComponent, LangJPComponent, LangENComponent, LangCHComponent
  ],
  providers: []
})
export class LanguageModule {}
