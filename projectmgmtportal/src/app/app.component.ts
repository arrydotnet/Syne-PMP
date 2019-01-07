import { Component, OnInit, OnDestroy,AfterContentChecked } from '@angular/core';
import { Post, UserPost } from './Models/app.post';
import { Subscription, throwError } from 'rxjs';
import { CommonService } from './services/commonService';
//import { DataService } from './services/data.service';

@Component({
    selector: 'root',
    templateUrl: 'app.component.html',
    providers: [CommonService]
})

export class AppComponent implements OnInit, OnDestroy {
    isloggedIn: boolean;
    message: string;
    posts: Array<Post>;
    userPost: UserPost;
    get_Sub: Subscription;

    constructor(private commonService: CommonService) {
        this.isloggedIn = false;
    }
    ngAfterContentChecked() {
       this.isloggedIn=this.commonService.IsloggedIn();
    }


    ngOnInit() {
        this.message = "Getting User Data from the server....";
        //this.isloggedIn = this.commonService.IsloggedIn();
        // this.get_Sub = this.dService.getUserPosts(10).subscribe(
        //     (data) => {
        //         this.userPost = data;
        //         this.message = "";
        //         console.log("Success....", data);
        //     }, (err: any) => {
        //         this.message = err;
        //         console.log(err);
        //     }
        // )
        // this.get_Sub = this.dService.getUserPosts(1).subscribe(
        //     (data) => {
        //         this.userPost = data;
        //         this.message = "User data";
        //         console.log("Success....", data);
        //     }, (err: any) => {
        //         this.message = err;
        //         console.log(err);
        //         //throw new Error('Connection errro!!!');
        //     }
        // )
        // this.get_Sub = this.dService.getAllPosts().subscribe(
        //     (data) => {
        //         this.posts = data;
        //         this.message = "";
        //         console.log("Success....", data);
        //     }, (err: any) => {
        //         this.message = err;
        //         console.log(err);
        //         //throw new Error('Connection errro!!!');
        //     }
        // )
    }

    ngOnDestroy(): void {
        //this.get_Sub.unsubscribe();
    }
}

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Post } from './Models/app.post';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Subscription } from 'rxjs';

// @Component({
//     selector: 'root',
//     templateUrl: 'root.component.html',
// })

// export class RootComponent implements OnInit, OnDestroy {
//     url: string;
//     message: string;
//     posts: Array<Post>;
//     get_Sub: Subscription;

//     constructor(private httpClient: HttpClient) {
//         this.url = "https://jsonplaceholder.typicode.com/posts";
//     }

//     ngOnInit() {
//         this.message = "Getting Data from the server....";

//         this.get_Sub = this.httpClient.get<Array<Post>>(this.url).subscribe(
//             (data) => { 
//                 this.posts = data;
//                 this.message = "";
//             }, (err: HttpErrorResponse) => {
//                 this.message = err.message;
//             }
//         )
//     }

//     ngOnDestroy(): void {
//         this.get_Sub.unsubscribe();
//     }
// }