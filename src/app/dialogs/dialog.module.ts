import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MessageDialogComponent } from './messageDialog.component'

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
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
