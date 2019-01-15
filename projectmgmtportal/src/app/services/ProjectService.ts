import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { iProject, iAllocatedProject, iUserStory, iTask } from "../Models/project";
import { Observable, throwError } from "rxjs";

@Injectable()
export class ProjectService {
    private baseUrl = "http://localhost:8000/api";

    constructor(private http: HttpClient) { }
    //api/projects
    GetAllProject() {
        return this.http.get<Array<iProject>>(this.baseUrl + "/projects").
            pipe(catchError(this.handleError<any>('GetAllProject')));

    }
    //api/projects/delete/:id
    DeleteProject(id: string) {
        return this.http.get<iProject>(this.baseUrl + "/projects/delete/" + id).
            pipe(catchError(this.handleError<any>('DeleteProject')));
    }
    //api/projects/:id
    GetProjectById(id: string) {
        return this.http.get<iProject>(this.baseUrl + "/projects/edit/" + id).
            pipe(catchError(this.handleError<any>('GetProjectById')));
    }
    //POST :api/projects/create
    AddProject(project: iProject) {
        return this.http.post<iProject>(this.baseUrl + "/projects/create/", {
            project
        }).pipe(catchError(this.handleError<any>('AddProject')));
    }
    //POST :api/projects/edit/:id
    UpdateProject(project: iProject) {
        return this.http.post<iProject>(this.baseUrl + "/projects/edit/" + project._id, {
            project
        }).pipe(catchError(this.handleError<any>('UpdateProject')));
    }

    //api/projects
    GetAllocatedProjectByEmployeeID(_id: number) {
        return this.http.get<Array<iAllocatedProject>>(this.baseUrl + "/projects/employee/" + _id).
            pipe(catchError(this.handleError<any>('GetAllocatedProjectByEmployeeID')));

    }
    GetAllAllocatedEmployee() {
        return this.http.get<Array<iAllocatedProject>>(this.baseUrl + "/projects/AllAllocatedEmployee/").
            pipe(catchError(this.handleError<any>('GetAllAllocatedEmployee')));
    }

    GetAllBillableEmployeeAllocation(_id: number) {
        return this.http.get<Array<iAllocatedProject>>(this.baseUrl + "/projects/employee/").
            pipe(catchError(this.handleError<any>('GetAllBillableEmployeeAllocation')));

    }
    SaveAllocatedProjectByEmployeeID(_empid: number, projects: string[]) {
        return this.http.post<boolean>(this.baseUrl + "/projects/allocate/" + _empid, {
            projects
        }).pipe(catchError(this.handleError<any>('SaveAllocatedProjectByEmployeeID')));
    }

    //api/projects/story/create/
    AddUserStory(userStory: iUserStory) {
        return this.http.post<iUserStory>(this.baseUrl + "/projects/story/create/", {
            userStory
        }).pipe(catchError(this.handleError<any>('AddUserStory')));
    }
    //api/projects/story/edit/
    UpdateUserStory(userStory: iUserStory) {
        return this.http.post<iUserStory>(this.baseUrl + "/projects/story/edit/" + userStory._id, {
            userStory
        }).pipe(catchError(this.handleError<any>('UpdateUserStory')));
    }
    //api/projects/story/:id
    GetUserStoryById(id: string) {
        return this.http.get<iUserStory>(this.baseUrl + "/projects/story/edit/" + id).
            pipe(catchError(this.handleError<any>('GetUserStoryById')));
    }
    //api/projects/:pid/story
    GetAllUserStoriesByProjectID(pid: string) {
        return this.http.get<Array<iUserStory>>(this.baseUrl + "/projects/story/" + pid).
            pipe(catchError(this.handleError<any>('GetAllUserStoriesByProjectID')));
    }
    //api/projects/story/delete/:sid
    DeleteUserStory(storyid: string) {
        return this.http.get<iProject>(this.baseUrl + "/projects/story/delete/" + storyid).
            pipe(catchError(this.handleError<any>('DeleteUserStory')));
    }
    GetAllOpenFinishedStories() {
        return this.http.get<Array<iUserStory>>(this.baseUrl + "/projects/story/").
            pipe(catchError(this.handleError<any>('GetAllOpenFinishedStories')));
    }


    //UserStoryTasks
    //api/tasks/:pid/:sid/create/ 
    AddTask(task: iTask) {
        var url = "/tasks/" + task.projectID + "/" + task.storyID + "/create";
        return this.http.post<iTask>(this.baseUrl + url, {
            task
        }).pipe(catchError(this.handleError<any>('AddTask')));
    }
    //api/tasks/:pid/:sid/update/:tid
    UpdateTask(task: iTask) {
        var url = "/tasks/" + task.projectID + "/" + task.storyID + "/update/" + task._id;
        return this.http.post<iTask>(this.baseUrl + url, {
            task
        }).pipe(catchError(this.handleError<any>('UpdateTask')));
    }
    //api/tasks/:tid
    GetTaskById(id: string) {
        return this.http.get<iTask>(this.baseUrl + "/tasks/" + id).
            pipe(catchError(this.handleError<any>('GetTaskById')));
    }
    //api/tasks/:pid/:sid
    GetAllTaskByStoryID(sid: string) {
        var url = "/tasks/story/" + sid;
        return this.http.get<Array<iTask>>(this.baseUrl + url).
            pipe(catchError(this.handleError<any>('GetAllTaskByStoryID')));
    }
    //api/tasks/delete/:taskid
    DeleteTask(taskID: string) {
        return this.http.get<iTask>(this.baseUrl + "/tasks/delete/" + taskID).
            pipe(catchError(this.handleError<any>('DeleteTask')));
    }
    //----------------------


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return throwError('Con Errror!!!!');
        };
    }
}