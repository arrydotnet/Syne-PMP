import { Injectable, ApplicationRef, Injector } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from './Dialog/confirmDialog.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ComponentRef, ComponentFactoryResolver } from '@angular/core';

@Injectable()
export class DialogsHelperService {
  public defaultWidth = '30vw';
  public dialogComponentRef: ComponentRef<any>;

  constructor(private dialogs: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }


  public confirm(title: string = 'Confirm Action', message: string = 'Are you sure, you want to delete ?'): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialogs.open(ConfirmDialogComponent, { width: this.defaultWidth });
    dialogRef.componentInstance.text1 = title;
    dialogRef.componentInstance.text2 = message;
    return dialogRef.afterClosed().pipe(map((res) => !!res)); // always return a boolean value
  }
  public openPopup(modalComponent: any, modalData: any, width ='250px'): Observable<boolean> {
    let dialogRef = this.dialogs.open(modalComponent, {
      width: width,
      height: '600px',
      data: modalData     
    });
    return dialogRef.afterClosed();
  }

}