import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { AuthenticationService } from "../../login/authentication.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public name: string;
    constructor(
        public auth: AuthenticationService,
        private routerExtensions: RouterExtensions
    ) {
    }

    ngOnInit(): void {
        this.name = this.auth.user.name;
    }

    logout(): void {
        this.auth.logout();
        this.routerExtensions.navigate(['/login'], { clearHistory: true })
    }
}
