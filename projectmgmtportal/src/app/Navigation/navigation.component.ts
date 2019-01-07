import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {

    }
    logout() {
        sessionStorage.removeItem("tk");
        this.router.navigate(['/login']);
    }
}