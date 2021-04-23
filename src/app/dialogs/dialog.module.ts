import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './messageDialog.component'

@NgModule({
  imports: [
    MatDialogModule,
  ],
  declarations: [
    MessageDialogComponent,
  ],
  providers: [],
  entryComponents: [
    MessageDialogComponent,
  ],
})
export class DialogModule {}
