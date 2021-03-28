import { NgModule }       from '@angular/core';

import { CSComponent }     from './cs.component';
import { CSAIComponent }     from './cs.ai.component';
import { CSAppDevComponent }     from './cs.appDev.component';
import { CSWebDevComponent }     from './cs.webDev.component';

import { PipeModule } from '../pipe.module'

@NgModule({
  imports: [
    PipeModule,
  ],
  declarations: [
    CSComponent, CSAIComponent, CSAppDevComponent, CSWebDevComponent
  ],
  providers: []
})
export class CSModule {}
