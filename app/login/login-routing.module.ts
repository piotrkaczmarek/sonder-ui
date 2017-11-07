import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login.component";
import { AuthGuard } from "./auth-guard.service";

const routes: Routes = [
    { path: "", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    providers: [
        AuthGuard
    ]
})
export class LoginRoutingModule { }
