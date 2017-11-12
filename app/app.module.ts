import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthenticationService } from "./auth/authentication.service";
import { AuthGuard } from "./auth/auth-guard.service";

import * as application from 'application';

import * as tnsOAuthModule from 'nativescript-oauth';

var facebookInitOptions: tnsOAuthModule.ITnsOAuthOptionsFacebook = {
    clientId: '897988177030305',
    clientSecret: 'bbd78c3b3bff9ae668fd24ad55fffef7',
    scope: ['public_profile', 'email']
};

tnsOAuthModule.initFacebook(facebookInitOptions);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
