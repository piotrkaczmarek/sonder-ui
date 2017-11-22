import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { User } from "../common/user";
import * as http from "tns-core-modules/http";
import { config } from "../app.config";
import * as tnsOAuthModule from 'nativescript-oauth';

@Injectable()
export class AuthenticationService {
    private loggedIn: boolean = false;
    public user: User;

    public accessToken: string;

    constructor(
    ) { }

    login(): Observable<any> {
        this.clearData.apply(this);
        let userDataObservable = Observable
            .fromPromise(tnsOAuthModule.ensureValidToken())
            .flatMap((accessToken) => this.authenticateBackend(accessToken))
            .flatMap(user => this.onLoginSuccess.apply(this, [user]));
        userDataObservable.catch(error => this.clearData.apply(this));
        return userDataObservable;
    }

    logout(): void {
        Observable.fromPromise(tnsOAuthModule.logout()).subscribe();
        this.clearData.apply(this);
    }

    isLoggedIn?(): boolean {
        return this.loggedIn;
    }

    private onLoginSuccess(user): Observable<any> {
        this.accessToken = user["facebook_access_token"];
        this.user = user;
        this.loggedIn = true;
        return Observable.create(observer => observer.next());
    }

    private authenticateBackend(accessToken): Observable < any > {
        let httpRequestPromise = http.request({
            url: config.BACKEND_API_URL + "/api/authenticate",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                content: JSON.stringify({ access_token: accessToken })
            });
        return Observable.fromPromise(httpRequestPromise)
                         .map((response) => {
                             if (response.statusCode != 200) { throw (response) }
                             return response.content.toJSON().data;
                         });
    }

    private clearData(): void {
        this.loggedIn = false;
        this.accessToken = null;
        this.user = null;
    }
}
