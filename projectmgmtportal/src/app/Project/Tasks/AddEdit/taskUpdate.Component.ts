import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from '../../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSelect } from '@angular/material';
import { ProjectService } from '../../../services/ProjectService';
import { iProject, iTask } from '../../../Models/project';
import { iEmployee } from '../../../Models/employee';
import { EmployeeService } from '../../../services/EmployeeService';
@Component({
    selector: 'project-update',
    templateUrl: './taskUpdate.Component.html',
    providers: [ProjectService, EmployeeService]
})
export class TaskUpdateComponent implements OnInit {
    submitted = false;
    AddEditForm: FormGroup;
    loading = false;
    EditID: string;//if empty then add else edit
    Task: iTask;
    PID: string;
    SID: string;
    empList: iEmployee[];
    isCancelled: boolean;
    constructor(
        public snackBar: MatSnackBar,
        private projectService: ProjectService,
        private employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutheticationService,
        private dialogRef: MatDialogRef<TaskUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.EditID = '';
        this.PID = '';
        this.SID = '';
        this.Task = {} as iTask;
        this.empList = [];
        this.isCancelled = false;
    }

    ngOnInit() {
        this.employeeService.GetAllEmployee()
            .subscribe((data) => {
                this.empList = data
            });

        this.AddEditForm = this.formBuilder.group({
            task_title: ['', Validators.required],
            desc: [''],
            completed: [false, Validators.required],
            startdate: [''],
            enddate: [''],
            assignedTo: ['', Validators.required],
        });
        this.PID = this.data.pid;
        this.SID = this.data.sid;
        this.EditID = this.data.tid;

        if (this.EditID) {//edit
            //this.EditID = this.data.tid;
            this.projectService.GetTaskById(this.EditID).subscribe((data) => {
                this.AddEditForm.setValue({
                    //project_id: data.project_id,
                    //storyID: data.storyID,
                    task_title: data.task_title,
                    desc: data.desc,
                    completed: !data.completed,
                    startdate: data.startdate,
                    enddate: data.enddate,
                    assignedTo: data.assignedTo
                });
            },
                (err) => {
                    //alert('Error');//redirect
                });
        }
    }
    // convenience getter for easy access to form fields
    get f() { return this.AddEditForm.controls; }
    onSubmit() {
        if(this.isCancelled){
            return;
        }
        this.submitted = true;
        // stop here if form is invalid
        if (this.AddEditForm.invalid) {
            return;
        }
        this.Task.projectID = this.PID;
        this.Task.storyID = this.SID;
        this.Task.task_title = this.f.task_title.value;
        this.Task.desc = this.f.desc.value;
        this.Task.completed = !this.f.completed.value;
        this.Task.startdate = this.f.startdate.value;
        this.Task.enddate = this.f.enddate.value;
        this.Task.assignedTo = this.f.assignedTo.value;
        if (this.EditID) {
            this.Task._id = this.EditID;
            this.projectService.UpdateTask(this.Task).subscribe((data) => {
                this.ShowMsg('Task has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        } else {
            this.projectService.AddTask(this.Task).subscribe((data) => {
                this.ShowMsg('Task has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        }
        this.loading = true;
    }
    onClose() {
        this.isCancelled = true;
        this.dialogRef.close();
    }
    ShowMsg(msg: string) {
        this.snackBar.open(msg, 'Close', { duration: 2000 });
        setTimeout(() => {
            this.dialogRef.close()
        }, 2000);
    }
}