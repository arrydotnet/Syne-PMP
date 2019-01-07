import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { iProject, iAllocatedProject } from '../../Models/project';
import { ProjectService } from '../../services/ProjectService';
import { EmployeeService } from '../../services/EmployeeService';
import { iEmployee } from '../../Models/employee';
import { DialogsHelperService } from '../../shared/DialogHelpers/dialogs-helper.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
@Component({
    selector: 'project-allocation',
    templateUrl: './project-allocation.component.html',
    providers: [ProjectService, EmployeeService]
})
export class ProjectAllocationComponent implements OnInit {
    projectList: iProject[];
    selectedOptions: string[];
    //employeeList: iEmployee[];


    constructor(public snackBar: MatSnackBar, private projectService: ProjectService, private employeeService: EmployeeService,
        private dialogRef: MatDialogRef<ProjectAllocationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.projectList = [];
        this.selectedOptions = [];

    }
    ngOnInit() {
        this.projectService.GetAllProject().subscribe((data) => {
            this.projectList = data;
            this.projectService.GetAllocatedProjectByEmployeeID(this.data.id).subscribe((alloted) => {
                var allocatedProj = alloted as iAllocatedProject[];
                if (allocatedProj) {
                    allocatedProj.forEach((x) => {
                        var itm = this.projectList.find(y => y.project_id === x.project_id);
                        if (itm) {
                            itm.allocated = true;
                        }
                    })
                }
            });
        });
    }
    onSave() {
        let userID = this.data.id;
        if (this.selectedOptions) {//array
            this.projectService.SaveAllocatedProjectByEmployeeID(userID, this.selectedOptions).subscribe((alloted) => {
                this.ShowMsg('Project assignement has been done sucessfully!');
                setTimeout(() => {
                    this.onClose();
                }, 2000);
            });
        }
    }
    onClose() {
        this.dialogRef.close();
    }
    ShowMsg(msg: string) {
        this.snackBar.open(msg, 'Close', { duration: 2000 });
    }


    onNgModelChange() {
        //console.log('on ng model change', event);
    }
}
