import { Component, OnInit, ViewChild } from '@angular/core';
import { iTask } from '../../Models/project';
import { ProjectService } from '../../services/ProjectService';
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { DialogsHelperService } from '../../shared/DialogHelpers/dialogs-helper.service';
import { TaskUpdateComponent } from '../Tasks/AddEdit/taskUpdate.Component';
import { UserStoriesComponent } from '../ViewUserStories/UserStories.Component';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    templateUrl: './tasks.Component.html',
    providers: [ProjectService]
})
export class TaskComponent implements OnInit {
    taskList: iTask[];
    dataSource: any;
    displayedColumns: string[];
    ProjectID: string;
    StoryID: string;
    StoryTitle:string;

    constructor(private route: ActivatedRoute, private projectService: ProjectService, private dialogs: DialogsHelperService,
        private router: Router) {
        this.taskList = [];
        this.displayedColumns = ['_id', 'storyID', 'task_title', 'desc', 'completed',
            'startdate', 'enddate', 'assignedTo', 'actions'];
            this.StoryTitle="";
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.fillData();
    }
    fillData(): void {
        this.ProjectID = this.route.snapshot.params["pid"];
        this.StoryID = this.route.snapshot.params["sid"];
        this.projectService.GetAllTaskByStoryID(this.StoryID).subscribe((data) => {
            this.dataSource = new MatTableDataSource<iTask>(data);
            this.dataSource.paginator = this.paginator;
        });
        this.projectService.GetUserStoryById(this.StoryID).subscribe((data) => {
            this.StoryTitle = data.storyID;
        });
    }
    public ConfirmDelete(_id: string) {
        if (_id) {
            this.dialogs.confirm('Confirm Delete ?').subscribe((res) => {
                if (res) {
                    this.projectService.DeleteTask(_id).subscribe((data) => {
                        this.fillData();
                    });
                }
            });
        }
    }
    public OpenEditPopup(_id: string) {
        this.dialogs.openPopup(TaskUpdateComponent, { pid: this.ProjectID, sid: this.StoryID,
            tid: _id }, '800px;')
            .subscribe(result => {
                this.fillData();
            });
    }
    //add user story
    // public OpenAddUserStoryPopup(_id: string) {
    //     this.dialogs.openPopup(TaskUpdateComponent, { project_id: _id }, '600px;')
    //         .subscribe(result => {
    //             this.fillData();
    //         });
    // }
    //view user story
    // public OpenViewUserStoryPopup(_id: string) {
    //     this.dialogs.openPopup(UserStoriesComponent, { pid: _id }, '1020px;')
    //         .subscribe(result => {
    //            // this.fillData();
    //         });
    // }



}