import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { User } from "./user";
import * as http from "tns-core-modules/http";
import { config } from "../app.config";

import * as tnsOAuthModule from 'nativescript-oauth';

@Injectable()
export class AuthenticationService {
    public isLoggedIn: boolean = false;
    public user: User;

    private accessToken: string;

    constructor(
    ) { }

    login(): Observable<any> {
        this.clearData.apply(this);
        let tokenRequestObservable = Observable.fromPromise(tnsOAuthModule.ensureValidToken())
        let userDataObservable = tokenRequestObservable
            .flatMap(this.fetchUserData)
            .flatMap((user) => this.onLoginSuccess.apply(this, [user]));
        tokenRequestObservable.subscribe(token => this.accessToken = token,
                                         error => this.clearData.apply(this));
        return userDataObservable;
    }

    logout(): void {
        Observable.fromPromise(tnsOAuthModule.logout()).subscribe();
        this.clearData.apply(this);
    }

    // private fakeLogin(): Observable<any> {
    //     this.user = new User('12345', 'Piotr Kaczmarek');
    //     this.isLoggedIn = true;
    //     this.accessToken = 'abcd';
    //     return Observable.create(observer => observer.next());
    // }

    private onLoginSuccess(user): Observable<any> {
        this.user = user;
        this.isLoggedIn = true;
        return Observable.create(observer => observer.next());
    }

    private fetchUserData(accessToken): Observable<any> {
        let url: string = config.FACEBOOK_GRAPH_API_URL + `/me?access_token=${accessToken}`;
        return Observable.fromPromise(http.getJSON(url));
    }

    private clearData(): void {
        this.isLoggedIn = false;
        this.accessToken = null;
        this.user = null;
    }
}
