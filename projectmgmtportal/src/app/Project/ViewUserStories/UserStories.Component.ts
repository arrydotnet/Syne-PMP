import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { iProject, iUserStory } from '../../Models/project';
import { ProjectService } from '../../services/ProjectService';
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { DialogsHelperService } from '../../shared/DialogHelpers/dialogs-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoryUpdateComponent } from '../UserStories/UserStoryUpdate.component';

@Component({
    templateUrl: './UserStories.Component.html',
    providers: [ProjectService],
    styles: [`.mat-column-_id {
        width: 45px;
    } .mat-column-desc{width:180px;}`]

})
export class UserStoriesComponent implements OnInit {
    uStoryList: iUserStory[];
    dataSource: any;
    displayedColumns: string[];
    projectID: string;
    projectTitle: string;
    constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService, private dialogs: DialogsHelperService
    ) {
        this.uStoryList = [];
        // this.displayedColumns = ['_id','storyID', 'project_id', 'story_title', 'desc', 'completed',
        //     'startdate', 'enddate', 'storyPoints','actions'];
        this.displayedColumns = ['_id', 'storyID', 'story_title', 'desc', 'completed',
            'startdate', 'enddate', 'storyPoints', 'actions'];
        this.projectID = '';
        this.projectTitle = '';
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit() {
        this.fillData();
    }
    fillData(): void {
        this.projectID = this.route.snapshot.params["pid"];
        this.projectService.GetAllUserStoriesByProjectID(this.projectID).subscribe((data) => {
            this.dataSource = new MatTableDataSource<iProject>(data);
            this.dataSource.paginator = this.paginator;
        });
        this.projectService.GetProjectById(this.projectID).subscribe((proj) => {
            this.projectTitle = proj.project_name + ' [' + proj.project_id + ']';
        });
    }
    public ConfirmDelete(_id: string) {
        if (_id) {
            this.dialogs.confirm('Confirm Delete ?').subscribe((res) => {
                if (res) {
                    this.projectService.DeleteUserStory(_id).subscribe((data) => {
                        this.fillData();
                    });
                }
            });
        }
    }
    public OpenEditPopup(_id: string) {
        this.dialogs.openPopup(UserStoryUpdateComponent, { storyID: _id }, '600px;')
            .subscribe(result => {
                this.fillData();
            });
    }
    public ViewTask(storyID: string) {
        //tasks/pid/sid/
        this.router.navigate(['/tasks/' + this.projectID + '/' + storyID]);
        //this.router.navigate(['/projects/' + this.projectID + '/stories/' + storyID+'/tasks']);
    }
}