import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { iEmployee } from "../Models/employee";
import { Observable, throwError } from "rxjs";

@Injectable()
export class EmployeeService {
    private baseUrl = "http://localhost:8000/api";


    constructor(private http: HttpClient) { }

    //api/employee
    GetAllEmployee() {
        return this.http.get<Array<iEmployee>>(this.baseUrl + "/employee").
            pipe(catchError(this.handleError<any>('GetAllEmployee')));
            
    }
    //api/employee/delete/:id
    DeleteEmployee(id:string) {
        return this.http.get<iEmployee>(this.baseUrl + "/employee/delete/"+id).
            pipe(catchError(this.handleError<any>('DeleteEmployee')));
    }
    //api/employee/:id
    GetEmployeeById(id: string) {
        return this.http.get<iEmployee>(this.baseUrl + "/employee/edit/"+id).
            pipe(catchError(this.handleError<any>('GetEmployeeById')));
    }
    //POST :api/employee/create
    AddEmployee(emp: iEmployee) {
        return this.http.post<iEmployee>(this.baseUrl + "/employee/create/",{
            emp
        }).pipe(catchError(this.handleError<any>('AddEmployee')));
    }
    //POST :api/employee/edit/:id
    UpdateEmployee(emp: iEmployee) {
        return this.http.post<iEmployee>(this.baseUrl + "/employee/edit/"+emp._id,{
            emp
        }).pipe(catchError(this.handleError<any>('UpdateEmployee')));
    }

    
    
    private handleError<T>(operation = 'operation', result?: T) {
        //console.error(`ERR RESULT :: ${result}`);

        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return throwError('Con Errror!!!!');
        };
    }
}