import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class AutheticationService {
    private url = "http://localhost:8000/api/authenticate";

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.url, { username: username, password: password })
            .pipe(map(resObject => {
                if (resObject && resObject.token) {
                    sessionStorage.setItem("tk", resObject.token);
                }
                return resObject;
            }));
    }

    logout() {
        sessionStorage.removeItem('tk');
    }

    getToken() {
        return sessionStorage.getItem('tk');
    }
}