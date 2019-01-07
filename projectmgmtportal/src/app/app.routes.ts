import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./Dashboard/dashboard.component";
import { AuthGuard } from "./services/authguard.service";
import { EmployeeComponent } from "./Employee/employee.component";
import { ProjectComponent } from "./Project/project.component";
import { UserStoriesComponent } from "./Project/ViewUserStories/UserStories.Component";
import { TaskComponent } from "./Project/Tasks/tasks.Component";

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  //{ path: 'projects/:pid/stories/:sid/tasks', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'tasks/:pid/:sid', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'projects/:pid/stories', component: UserStoriesComponent, canActivate: [AuthGuard] },
    {
        path: 'projects', component: ProjectComponent, canActivate: [AuthGuard],
        children: [{
            path: 'projectdetails', component: ProjectComponent, canActivate: [AuthGuard]
        }]
    },


    { path: 'login', component: LoginComponent },
    //{ path: '**', component: NotFoundComponent }
];
