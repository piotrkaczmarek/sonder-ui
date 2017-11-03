import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";

@NgModule({
    imports: [
        NativeScriptModule,
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule { }
