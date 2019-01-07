import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './iCommonDialogData';
@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirmDialog.component.html',
})
export class ConfirmDialogComponent {
    public text1: string;
    public text2: string;
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}