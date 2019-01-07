import { Injectable } from '@angular/core';

export class CommonService {

    constructor() { }
    IsloggedIn():boolean{
       return sessionStorage.getItem('tk')!==null;
    }
}