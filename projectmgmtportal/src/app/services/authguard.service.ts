import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AutheticationService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private aService: AutheticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.aService.getToken()) {
            return true;
        }

        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}