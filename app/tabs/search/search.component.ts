import { Component, OnInit } from "@angular/core";
import { PartyService } from "../../common/party.service";
import { Party } from "../../common/party";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    public parties: Array<Party> = [];

    constructor(private partyService: PartyService) {
    }

    ngOnInit(): void {
        this.getParties();
    }

    getParties(): void {
        this.partyService.getParties().subscribe(parties => {
            this.parties = parties;
        });
    }
    dismiss(partyId): void {
        this.partyService.dismissParty(partyId);
    }

    request(partyId): void {
        this.partyService.requestParty(partyId);
    }
}
