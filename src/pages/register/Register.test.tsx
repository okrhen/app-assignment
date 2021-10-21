import React from "react";
import { mount } from "@cypress/react"; // or @cypress/vue
import Register from ".";

describe("Register", () => {
    it("has header text", () => {
        mount(<Register />);
        cy.get("[data-testid=welcome]").should("have.text", "Welcome");
        cy.get("[data-testid=welcomeSub]").should(
            "have.text",
            "Hi there. Ready to register."
        );
    });

    it("has bottom text", () => {
        mount(<Register />);
        cy.get("[data-testid=bottomText]").should(
            "have.text",
            "Already have an account? Login"
        );
    });

    it("has working register link", () => {
        mount(<Register />);

        cy.get("a").should("have.text", "Login");
        cy.get("a").should("have.attr", "href", "/login");
    });

    it("has input Username and Password input", () => {
        mount(<Register />);

        cy.get("input")
            .first()
            .invoke("attr", "placeholder")
            .should("contain", "Username");
        cy.get("input")
            .eq(1)
            .invoke("attr", "placeholder")
            .should("contain", "Password");
        cy.get("input")
            .last()
            .invoke("attr", "placeholder")
            .should("contain", "Confirm Password");
    });

    it("has Register Button", () => {
        mount(<Register />);
        cy.get("button").should("have.text", "Register");
        cy.get("button").should("be.disabled");
    });
});
