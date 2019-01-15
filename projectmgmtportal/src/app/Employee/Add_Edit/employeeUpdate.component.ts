import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutheticationService } from '../../services/authentication.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { EmployeeService } from '../../services/EmployeeService';
import { iEmployee } from '../../Models/employee';
@Component({
    selector: 'employee-update',
    templateUrl: './employeeUpdate.component.html',
    providers: [EmployeeService]
})

export class EmployeeUpdateComponent implements OnInit {
    submitted = false;
    AddEditForm: FormGroup;
    loading = false;
    EditID: string;//if empty then add else edit
    Employee: iEmployee;
    isCancelled: boolean;
    constructor(
        public snackBar: MatSnackBar,
        private empService: EmployeeService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AutheticationService,
        private dialogRef: MatDialogRef<EmployeeUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.EditID = '';
        this.Employee = {} as iEmployee;
        this.isCancelled = false;
    }

    ngOnInit() {
        this.AddEditForm = this.formBuilder.group({
            name: ['', Validators.required],
            designation: ['', Validators.required],
            pwd: ['1234', Validators.required],
            disabled: [false, Validators.required]
        });
        if (this.data.id) {//edit
            this.EditID = this.data.id;
            this.empService.GetEmployeeById(this.data.id).subscribe((data) => {
                this.AddEditForm.setValue({
                    name: data.name,
                    designation: data.designation,
                    pwd: data.pwd,
                    disabled: !data.disabled
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
        if(this.isCancelled){
            return;
        }
        this.submitted = true;
        // stop here if form is invalid
        if (this.AddEditForm.invalid) {
            return;
        }
        this.Employee.name = this.f.name.value;
        this.Employee.designation = this.f.designation.value;
        this.Employee.pwd = this.f.pwd.value;
        this.Employee.disabled = !this.f.disabled.value;
        if (this.EditID.length > 0) {
            this.Employee._id = this.EditID;
            this.empService.UpdateEmployee(this.Employee).subscribe((data) => {
                this.ShowMsg('Project has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        } else {
            this.empService.AddEmployee(this.Employee).subscribe((data) => {
                this.ShowMsg('Project has been added/updated sucessfully!');
            }, (err) => {
                this.ShowMsg('Error while adding/updating!!!');
            });
        }
        this.loading = true;
    }
    onClose() {
        this.isCancelled = true;
        this.dialogRef.close();
    }
    ShowMsg(msg: string) {
        this.snackBar.open(msg, 'Close', { duration: 2000 });
        setTimeout(() => {
            this.dialogRef.close()
        }, 2000);
    }
}