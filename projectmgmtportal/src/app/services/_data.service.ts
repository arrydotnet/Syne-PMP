// import { HttpClient } from "@angular/common/http";
// import { Post, UserPost } from "../Models/app.post";
// import { Injectable } from "@angular/core";
// import { catchError, map } from 'rxjs/operators';
// import { Observable, of, throwError, forkJoin } from "rxjs";

// @Injectable()
// export class DataService {
//     private baseUrl = "https://jsonplaceholder.typicode.com";
//     //private url = "https://jsonplaceholder.typicode.com/posts";
//     //http://jsonplaceholder.typicode.com/users/1/posts

//     constructor(private httpClient: HttpClient) { }

//     getAllPosts() {
//         return this.httpClient.get<Array<Post>>(this.baseUrl + "/posts")
//             .pipe(catchError(this.handleError<any>('GetAllProducts')));
//     }
//     getUserPosts(id: number) {
//         var user = this.httpClient.get<Array<UserPost>>(this.baseUrl + "/users/" + id)
//             .pipe(catchError(this.handleError<any>('getUser')));

//         var posts = this.httpClient.get<Array<UserPost>>(this.baseUrl + "/users/" + id + "/posts")
//             .pipe(catchError(this.handleError<any>('getUserPosts')));

//         return forkJoin([user, posts])
//             .pipe(map(x => {
//                 x[0].posts = x[1];
//                 return x[0];
//             }))



//         // return  this.httpClient.get<Array<UserPost>>(this.baseUrl+"/users/"+id).subscribe(user => {
//         //         this.httpClient.get<Array<Post>>(this.baseUrl+"/users/"+id+"/posts").subscribe(posts => {
//         //             user[0].posts=posts;
//         //             return user[0] ;
//         //         });
//         //       });


//     }

//     private handleError<T>(operation = 'operation', result?: T) {
//         return (error: any): Observable<T> => {
//             console.error(`${operation} failed: ${error.message}`);
//             return throwError('Con Errror!!!!');
//         };
//     }
// }