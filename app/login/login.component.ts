import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./authentication.service"

import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "LoginComponent",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    private errorMessage: string;
    constructor(
        private authenticationService: AuthenticationService,
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
    }

    login() {
        this.authenticationService.login().subscribe(
            () => {
                this.errorMessage = null;
                this.routerExtensions.navigate(['/tabs'], { clearHistory: true });
            },
            error => this.errorMessage = error);
    }
}
