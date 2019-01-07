import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/EmployeeService';
import { iEmployee, Car } from '../Models/employee';
import { MatPaginator, MatTableDataSource } from '@angular/material'
import { DialogsHelperService } from '../shared/DialogHelpers/dialogs-helper.service';
import { EmployeeUpdateComponent } from './Add_Edit/employeeUpdate.component';
import { ProjectAllocationComponent } from './ProjectAllocation/project-allocation.component';
@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    providers: [EmployeeService, DialogsHelperService],
    styleUrls: ['./employee.component.css']

})
export class EmployeeComponent implements OnInit {
    employeeList: iEmployee[];
    displayedColumns: string[];
    dataSource: any;
    message: string;
    employee: iEmployee;
    constructor(private empService: EmployeeService, private dialogs: DialogsHelperService) {
        this.employeeList = [];
        this.displayedColumns = ['_id', 'name', 'designation', 'disabled', 'actions'];
        this.message = '';
        //this.employee={};
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() {
        this.fillData();
    }
    fillData(): void {
        this.empService.GetAllEmployee().subscribe((data) => {
            this.dataSource = new MatTableDataSource<iEmployee>(data);
            this.dataSource.paginator = this.paginator;
        });
    }
    public ConfirmDelete(_id: string) {
        if (_id) {
            this.dialogs.confirm('Confirm Delete ?').subscribe((res) => {
                if (res) {
                    this.empService.DeleteEmployee(_id).subscribe((data) => {
                        this.fillData();
                    });
                }
            });
        }
    }
    public OpenEditPopup(_id: string) {
        this.dialogs.openPopup(EmployeeUpdateComponent, { id: _id }, '600px;')
            .subscribe(result => {
                this.fillData();
                if (result)
                    console.log('openPopup');
            });
    }
    public OpenAllocationPopup(_id: string, name: string) {
        this.dialogs.openPopup(ProjectAllocationComponent, { id: _id, name: name }, '600px;')
            .subscribe(result => {
                // this.fillData();
                if (result)
                    console.log('OpenAllocationPopup');
            });
    }
}
