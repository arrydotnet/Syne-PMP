// import { HttpClient } from "@angular/common/http";
// import { Post, UserPost, Product } from "../Models/app.post";
// import { Injectable } from "@angular/core";
// import { catchError, map } from 'rxjs/operators';
// import { Observable, of, throwError, forkJoin } from "rxjs";

// @Injectable()
// export class DataService {
//     private baseUrl = "http://localhost:8000/";

//     constructor(private httpClient: HttpClient) { }

//     GetAllProducts() {
//         return this.httpClient.get<Array<Product>>(this.baseUrl + "/products")
//             .pipe(catchError(this.handleError<any>('GetAllProducts')));
//     }
    
//     getProductById(id:number) {
//         return this.httpClient.get<Product>(this.baseUrl + "/products/"+id)
//             .pipe(catchError(this.handleError<any>('getProductById')));
//     }
//     deleteProductById(id:number) {
//         return this.httpClient.delete(this.baseUrl + "/products/"+id)
//             .pipe(catchError(this.handleError<any>('deleteProductById')));
//     }
//     insertProduct(prod:Product) {
//         return this.httpClient.post(this.baseUrl + "/products",prod)
//             .pipe(catchError(this.handleError<any>('getProductById')));
//     }
//     private handleError<T>(operation = 'operation', result?: T) {
//         return (error: any): Observable<T> => {
//             console.error(`${operation} failed: ${error.message}`);
//             return throwError('Con Errror!!!!');
//         };
//     }
// }