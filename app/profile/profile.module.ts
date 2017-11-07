import { NgModule } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
    imports: [
        NativeScriptModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule { }
