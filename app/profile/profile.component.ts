import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthenticationService } from "../login/authentication.service";

@Component({
    selector: "ProfileComponent",
    moduleId: module.id,
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    private errorMessage: string;
    public name: string = 'crapbag';
    constructor(
        public auth: AuthenticationService,
        private router: Router,
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.name = this.auth.user.name;
    }
}
