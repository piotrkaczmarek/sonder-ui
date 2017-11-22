import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private routerExtensions: RouterExtensions
    ) { }

    canActivate(): boolean {
        if (this.authenticationService.isLoggedIn()) { return true; }
        this.routerExtensions.navigate(["/login"]);
        return false;
    }
}