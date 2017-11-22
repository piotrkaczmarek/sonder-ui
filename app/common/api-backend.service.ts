import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import * as http from "tns-core-modules/http";
import { config } from "../app.config";
import { AuthenticationService } from "../auth/authentication.service";

@Injectable()
export class ApiBackendService {
    constructor(private auth: AuthenticationService
    ) { }

    get(path: string, params: any = {}): Observable<any> {
        return this.request('GET', path, params);
    }

    post(path: string, params: any = {}): Observable<any> {
        return this.request('POST', path, params);
    }

    private request(method: string, path: string, params: any): Observable<any> {
        let httpRequestPromise = http.request({
            url: `${config.BACKEND_API_URL}/api${path}`,
            method: method,
            headers: this.headers(),
            content: JSON.stringify(params)
        });
        return Observable.fromPromise(httpRequestPromise)
                         .map((response) => {
                            if (response.statusCode != 200) { throw(response) }
                            return response.content.toJSON().data;
                            });
    }

    private headers(): any {
        let headers = { "Content-Type": "application/json" }
        if (this.auth.accessToken) { headers["AccessToken"] = this.auth.accessToken }
        return headers;
    }
}
