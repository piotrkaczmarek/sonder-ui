import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from '../auth/auth-guard.service';

import { TabsComponent } from "./tabs.component";

const routes: Routes = [
    { path: "", component: TabsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    providers: [
    ]
})
export class TabsRoutingModule { }
