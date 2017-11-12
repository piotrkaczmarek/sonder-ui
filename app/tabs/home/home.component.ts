import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AuthenticationService } from "../../auth/authentication.service";
import { User } from "../../auth/user";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public user: User;
    constructor(
        public auth: AuthenticationService,
        private routerExtensions: RouterExtensions
    ) {
        this.user = this.auth.user;
    }

    ngOnInit(): void {
        this.user = this.auth.user;
    }

    logout(): void {
        this.auth.logout();
        this.routerExtensions.navigate(['/login'], { clearHistory: true })
    }
}
