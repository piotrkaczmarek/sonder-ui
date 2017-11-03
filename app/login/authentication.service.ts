import { Injectable } from "@angular/core";
import * as Facebook from "nativescript-facebook";
import { Observable } from "rxjs/Rx";
import { User } from "./user";
import * as http from "tns-core-modules/http";
import { config } from "../app.config";

@Injectable()
export class AuthenticationService {
    private accessToken: string;
    private user: User;

    constructor(
    ) { }

    login(): Observable<any> {
        let userDataRequestObservable = Observable.bindNodeCallback(Facebook.login)()
                                                  .flatMap(this.fetchUserData);
        userDataRequestObservable.subscribe(this.onLoginSuccess, this.onLoginFailure);
        return userDataRequestObservable;
    }

    fetchUserData(data): Observable<any> {
        this.accessToken = data.token;
        let url: string = config.FACEBOOK_GRAPH_API_URL + `/me?access_token=${this.accessToken}`;
        return Observable.fromPromise(http.getJSON(url));
    }

    onLoginSuccess(data): void {
        this.user = data;
    }

    onLoginFailure(error): void {
        this.accessToken = null;
    }
}
