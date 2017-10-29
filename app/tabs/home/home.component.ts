import { Component, OnInit } from "@angular/core";
import * as Facebook from "nativescript-facebook";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
    }


    onLogin(eventData: Facebook.LoginEventData) {
        if (eventData.error) {
            debugger;
            alert("Error during login: " + eventData.error);
        } else {
            debugger;
            console.log(eventData.loginResponse.token);
        }
    }

    onButtonClick() {
        console.log('click');
        debugger;
    }

    login() {
        Facebook.login((error, fbData) => {
            if (error) {
                debugger;
                alert("Error during login: " + error.message);
            } else {
                debugger;
                console.log(fbData.token);
            }
        });
    }
}
