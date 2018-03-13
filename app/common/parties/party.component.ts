import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "PartyComponent",
    moduleId: module.id,
    templateUrl: "./party.component.html"
})
export class PartyComponent implements OnInit {
    @Input() party;

    constructor(
    ) { }

    ngOnInit(): void {
    }
}
