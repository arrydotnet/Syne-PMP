import { Component, OnInit, ViewChild } from '@angular/core';
import { iProject } from '../Models/project';
import { ProjectService } from '../services/ProjectService';
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { DialogsHelperService } from '../shared/DialogHelpers/dialogs-helper.service';
import { ProjectUpdateComponent } from './Add_Edit/projectUpdate.component';
import { UserStoryUpdateComponent } from './UserStories/UserStoryUpdate.component';
import { UserStoriesComponent } from './ViewUserStories/UserStories.Component';
import { Router } from '@angular/router';


@Component({
    templateUrl: './project.component.html',
    providers: [ProjectService]
})
export class ProjectComponent implements OnInit {
    projectList: iProject[];
    dataSource: any;
    displayedColumns: string[];

    constructor(private projectService: ProjectService, private dialogs: DialogsHelperService,
        private router: Router) {
        this.projectList = [];
        this.displayedColumns = ['_id', 'project_id', 'project_name', 'desc', 'completed',
            'startdate', 'enddate', 'actions'];
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.fillData();
    }
    fillData(): void {
        this.projectService.GetAllProject().subscribe((data) => {
            this.dataSource = new MatTableDataSource<iProject>(data);
            this.dataSource.paginator = this.paginator;
        });
    }
    public ConfirmDelete(_id: string) {
        if (_id) {
            this.dialogs.confirm('Confirm Delete ?').subscribe((res) => {
                if (res) {
                    this.projectService.DeleteProject(_id).subscribe((data) => {
                        this.fillData();
                    });
                }
            });
        }
    }
    public OpenEditPopup(_id: string) {
        this.dialogs.openPopup(ProjectUpdateComponent, { id: _id }, '600px;')
            .subscribe(result => {
                this.fillData();
            });
    }
    //add user story
    public OpenAddUserStoryPopup(_id: string) {
        this.dialogs.openPopup(UserStoryUpdateComponent, { project_id: _id }, '600px;')
            .subscribe(result => {
                this.fillData();
            });
    }
    //view user story
    // public OpenViewUserStoryPopup(_id: string) {
    //     this.dialogs.openPopup(UserStoriesComponent, { pid: _id }, '1020px;')
    //         .subscribe(result => {
    //            // this.fillData();
    //         });
    // }
    public ViewUserStories(pid: string) {
        // <!-- projects/:pid/stories -->
        this.router.navigate(['/projects/'+pid+'/stories']);

        // this.dialogs.openPopup(UserStoriesComponent, { pid: pid }, '1020px;')
        //     .subscribe(result => {
        //        // this.fillData();
        //     });
    }


}