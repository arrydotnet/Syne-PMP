import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from '../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectService } from '../../services/ProjectService';
import { iProject } from '../../Models/project';
@Component({
    selector: 'project-update',
    templateUrl: './projectUpdate.component.html',
    providers: [ProjectService]
})
export class ProjectUpdateComponent implements OnInit {
    submitted = false;
    AddEditForm: FormGroup;
    loading = false;
    EditID: string;//if empty then add else edit
    Project: iProject;
    constructor(
        public snackBar: MatSnackBar,
        private projectService: ProjectService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutheticationService,
        private dialogRef: MatDialogRef<ProjectUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.EditID = '';
        this.Project = {} as iProject;
    }

    ngOnInit() {
        this.AddEditForm = this.formBuilder.group({
            project_id: [0, Validators.required],
            project_name: ['', Validators.required],
            desc: [''],
            completed: [false, Validators.required],
            startdate: [''],
            enddate: [''],
        });
        if (this.data.id) {//edit
            this.EditID = this.data.id;
            this.projectService.GetProjectById(this.data.id).subscribe((data) => {
                this.AddEditForm.setValue({
                    project_id: data.project_id,
                    project_name: data.project_name,
                    desc: data.desc,
                    completed: data.completed,
                    startdate: data.startdate,
                    enddate: data.enddate
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
        debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.AddEditForm.invalid) {
            return;
        }
        this.Project.project_id = this.f.project_id.value;
        this.Project.project_name = this.f.project_name.value;
        this.Project.desc = this.f.desc.value;
        this.Project.completed = this.f.completed.value;
        this.Project.startdate = this.f.startdate.value;
        this.Project.enddate = this.f.enddate.value;
        this.Project.hasUserStory = false;
        if (this.EditID.length > 0) {
            this.Project._id = this.EditID;
            this.projectService.UpdateProject(this.Project).subscribe((data) => {
                this.ShowMsg('Project has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        } else {
            this.projectService.AddProject(this.Project).subscribe((data) => {
                this.ShowMsg('Project has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        }
        this.loading = true;
    }
    onClose() {
        this.dialogRef.close();
    }
    ShowMsg(msg: string) {
        this.snackBar.open(msg, 'Close', { duration: 2000 });
        setTimeout(() => {
            this.dialogRef.close()
        }, 2000);
    }
}