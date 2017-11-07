import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ProfileComponent } from "./profile.component";
import { AuthGuard } from "../login/auth-guard.service";

const routes: Routes = [
    { path: "", component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    providers: [
        AuthGuard
    ]
})
export class ProfileRoutingModule { }
