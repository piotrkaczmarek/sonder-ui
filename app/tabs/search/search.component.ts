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
        this.partyService.getParties().subscribe(parties => {
            this.parties = parties;
        });
    }
}
