import { EmployeeService } from "../../services/EmployeeService";
import { ProjectService } from "../../services/ProjectService";
import { map } from "rxjs/operators";
import { iEmployee } from "../../Models/employee";
import { Injectable } from "@angular/core";
import { iProject } from "../../Models/project";
@Injectable()
export class DashBoardService {

    constructor(private empService: EmployeeService, private projectService: ProjectService) { }

    GetActiveInactiveEmployee(): any {
        return this.empService.GetAllEmployee()
            .pipe(
                map((data: iEmployee[]) => {
                    return [{
                        name: 'Active',
                        y: data.filter(x => !x.disabled).length,
                        selected: true
                    }, {
                        name: 'InActive',
                        y: data.filter(x => x.disabled).length
                    }];
                })
            );
    }
    GetCompletedFinishedProjects() {
        return this.projectService.GetAllProject().pipe(
            map((data: iProject[]) => {
                return [{
                    name: 'Completed',
                    y: data.filter(x => x.completed).length,
                    selected: true
                }, {
                    name: 'In Progress',
                    y: data.filter(x => !x.completed).length
                }];
            })
        );
    }
    GetBillableEmployee() {
        this.projectService.CounteAllocatedEmployee().subscribe((data)=>{
            console.log(data);
        })
        // return this.projectService.CounteAllocatedEmployee().pipe(
        //     map((data: iProject[]) => {
        //         return [{
        //             name: 'Completed',
        //             y: data.filter(x => x.completed).length,
        //             selected: true
        //         }, {
        //             name: 'In Progress',
        //             y: data.filter(x => !x.completed).length
        //         }];
        //     })
        // );
    }

} 