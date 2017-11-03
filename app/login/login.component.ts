import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./authentication.service"

@Component({
    selector: "LoginComponent",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {

    }

    login() {
        this.authenticationService.login().subscribe(
            data => {
            },
            error => {
            }
        );
    }
}
