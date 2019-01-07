import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './Dialog/confirmDialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DialogsHelperService } from './dialogs-helper.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [DialogsHelperService],  
})
export class DialogsHelperModule { 
  
}