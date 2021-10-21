import React from "react";
import { mount } from "@cypress/react"; // or @cypress/vue
import Home from ".";
import Balance from "./Balance";
import Transaction from "./Transaction";

describe("Home", () => {
    it("show balance details empty", () => {
        mount(<Balance />);
        cy.get("[data-testid=accountNo]").should("have.text", "Account No.");
        cy.get("[data-testid=currency]").contains("SGD 0.00");
        cy.get("span").last().should("have.text", "Current balance");
    });

    it("show transaction details empty", () => {
        mount(<Home />);
        cy.get("span").first().should("have.text", "App Name");
    });

    it("show transaction transfer button", () => {
        mount(<Home />);
        cy.get('button').should('be.visible')
        cy.get("button").should("have.text", "Make Transfer");
    });

    it("show logout icon", () => {
        mount(<Home />);
        cy.get('svg').should('be.visible')
    });

});
