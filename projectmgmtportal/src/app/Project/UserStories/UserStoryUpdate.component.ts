import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from '../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectService } from '../../services/ProjectService';
import { iUserStory } from '../../Models/project';
@Component({
    selector: 'project-update',
    templateUrl: './UserStoryUpdate.component.html',
    providers: [ProjectService],
})
export class UserStoryUpdateComponent implements OnInit {
    submitted = false;
    AddEditForm: FormGroup;
    loading = false;
    EditID: string;//if empty then add else edit
    UserStory: iUserStory;
    UserStoryEditID:string;
    constructor(
        public snackBar: MatSnackBar,
        private projectService: ProjectService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutheticationService,
        private dialogRef: MatDialogRef<UserStoryUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.EditID = '';
        this.UserStoryEditID = '';

        this.UserStory = {} as iUserStory;
    }

    ngOnInit() {
        debugger;
        this.AddEditForm = this.formBuilder.group({ //  projectID: string;//ObjectId from page
            storyID: [0, Validators.required],
            story_title: ['', Validators.required],
            desc: [''],
            completed: [false, Validators.required],
            startdate: [''],
            enddate: [''],
            storyPoints: [0],
        });
        if (this.data.storyID) {//edit
            //this.EditID = this.data.project_id;// objectid
            this.UserStoryEditID = this.data.storyID;// objectid

            
            this.projectService.GetUserStoryById(this.UserStoryEditID).subscribe((data) => {
                this.AddEditForm.setValue({
                    storyID: data.storyID,
                    story_title: data.story_title,
                    desc: data.desc,
                    completed: !data.completed,
                    startdate: data.startdate,
                    enddate: data.enddate,
                    storyPoints:data.storyPoints
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
        this.submitted = true;
        // stop here if form is invalid
        if (this.AddEditForm.invalid) {
            return;
        }
        this.UserStory.projectID =this.data.project_id;
        this.UserStory.storyID = this.f.storyID.value;
        this.UserStory.story_title = this.f.story_title.value;
        this.UserStory.desc = this.f.desc.value;
        this.UserStory.completed = !this.f.completed.value;
        this.UserStory.startdate = this.f.startdate.value;
        this.UserStory.enddate = this.f.enddate.value;
        this.UserStory.storyPoints = this.f.storyPoints.value;
        this.UserStory._id = this.UserStoryEditID;//if edit 
        debugger;
        if (this.UserStoryEditID.length > 0) {
            //this.UserStory._id = this.EditID;
            this.projectService.UpdateUserStory(this.UserStory).subscribe((data) => {
                this.ShowMsg('User Story has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        } else {
            this.projectService.AddUserStory(this.UserStory).subscribe((data) => {
                this.ShowMsg('User Story has been added/updated sucessfully!');
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