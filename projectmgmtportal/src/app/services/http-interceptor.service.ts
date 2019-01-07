import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AutheticationService } from "./authentication.service";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private aService: AutheticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = req.clone({
            setHeaders: {
                'x-access-token': `${this.aService.getToken()}`
            }
        });

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        console.log("Success - ", event.status);
                    }
                }, error => {
                    console.log("Status Code: ", error.status);
                })
            )
    }
}