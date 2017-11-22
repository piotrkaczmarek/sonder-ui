import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import { ApiBackendService } from "./api-backend.service";
import { Party } from "./party";

@Injectable()
export class PartyService {
    private parties: Array<Party> = [];
    constructor(private backend: ApiBackendService
    ) { }

    getParties(): Observable<any> {
        if (this.parties.length > 0) {
            return Observable.create(observer => observer.next(this.parties))
        }
        let observable = this.backend.get("/parties");
        observable.subscribe(parties => {
            debugger;
            this.parties = parties;
        })
        return observable;
    }
}
