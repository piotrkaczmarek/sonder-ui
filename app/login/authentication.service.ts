import { Injectable } from "@angular/core";
import * as FacebookSdk from "nativescript-facebook";
import { login as fbLogin, logout as fbLogout } from "nativescript-facebook";
import { Observable } from "rxjs/Rx";
import { User } from "./user";
import * as http from "tns-core-modules/http";
import { config } from "../app.config";

@Injectable()
export class AuthenticationService {
    public isLoggedIn: boolean = false;
    public user: User;

    private accessToken: string;

    constructor(
    ) { }

    login(): Observable<any> {
        // return this.fakeLogin.apply(this);
        this.isLoggedIn = false;
        let tokenRequestObservable = Observable.bindNodeCallback(FacebookSdk.login)()
                                               .map(data => data['token']);
        let userDataObservable = tokenRequestObservable
            .flatMap(this.fetchUserData)
            .flatMap((user) => this.onLoginSuccess.apply(this, [user]));
        tokenRequestObservable.subscribe(token => {
            this.accessToken = token
        }, error => this.clearData.apply(this));
        return userDataObservable;
    }

    logout(): void {
        FacebookSdk.logout(()=> {});
        this.clearData.apply(this);
        this.isLoggedIn = false;
    }

    getUser(): User {
        return this.user;
    }

    private fakeLogin(): Observable<any> {
        this.user = new User('12345', 'Piotr Kaczmarek');
        this.isLoggedIn = true;
        this.accessToken = 'abcd';
        return Observable.create(observer => observer.next());
    }

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
        this.accessToken = null;
        this.user = null;
    }
}
