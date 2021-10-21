import React from "react";
import { mount } from "@cypress/react"; // or @cypress/vue
import Transfer from ".";

describe("Transfer", () => {
    it("has header text", () => {
        mount(<Transfer />);
        cy.get("span").should("have.text", "Transfer");
    });

    it("has input exists", () => {
        mount(<Transfer />);
        cy.get("input")
            .first()
            .invoke("attr", "placeholder")
            .should("contain", "Payee");

        cy.get("input")
            .last()
            .invoke("attr", "placeholder")
            .should("contain", "Amount");

        cy.get("textarea")
            .last()
            .invoke("attr", "placeholder")
            .should("contain", "Description ( Optional )");
    })

    it('has button', () => {
        mount(<Transfer />);

        cy.get("button").should('have.text', "Transfer")
        cy.get("button").should('be.disabled')
    })
})