import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TokenInterceptor } from "./services/http-interceptor.service";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { AuthGuard } from "./services/authguard.service";
import { AutheticationService } from "./services/authentication.service";
import { DashboardComponent } from "./Dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./Navigation/navigation.Component";
import { EmployeeComponent } from "./Employee/employee.component";
import { ProjectComponent } from "./Project/project.component";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule,MatPaginatorModule,  MatListModule, MatSnackBarModule }from '@angular/material'
import { DialogsHelperModule } from "./shared/DialogHelpers/dialogs-helper.module";
import { EmployeeUpdateComponent } from "./Employee/Add_Edit/employeeUpdate.component";
import { ProjectAllocationComponent } from "./Employee/ProjectAllocation/project-allocation.component";
import { ProjectUpdateComponent } from "./Project/Add_Edit/projectUpdate.component";
import { UserStoryUpdateComponent } from "./Project/UserStories/UserStoryUpdate.component";
import { UserStoriesComponent } from "./Project/ViewUserStories/UserStories.Component";
import { TaskComponent } from "./Project/Tasks/tasks.Component";
import { TaskUpdateComponent } from "./Project/Tasks/AddEdit/taskUpdate.Component";
import { HighChartComponent } from "./HighCharts/ChartComponent/HighChart.Component";
import { DashBoardService } from "./HighCharts/Services/DashbordChartService";
import { EmployeeService } from "./services/EmployeeService";
import { ProjectService } from "./services/ProjectService";
@NgModule({
    imports: [BrowserModule,BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule,
        RouterModule.forRoot(routes),MatTableModule,MatPaginatorModule, DialogsHelperModule,
        MatListModule,MatSnackBarModule
    ],
    declarations: [AppComponent,DashboardComponent,LoginComponent,NavigationComponent,EmployeeComponent,ProjectComponent,
        EmployeeUpdateComponent,ProjectAllocationComponent,ProjectUpdateComponent,UserStoryUpdateComponent,
        UserStoriesComponent,TaskComponent,TaskUpdateComponent,HighChartComponent],   
    providers: [
        AutheticationService, AuthGuard,DashBoardService,EmployeeService,ProjectService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EmployeeUpdateComponent,ProjectAllocationComponent,ProjectUpdateComponent,UserStoryUpdateComponent,
        UserStoriesComponent,TaskUpdateComponent
        
    ]
})
export class AppModule { }