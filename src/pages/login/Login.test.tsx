import React from 'react'
import { mount } from '@cypress/react' // or @cypress/vue
import Login from '.'


describe('Login', () => {
    it('has header text', () => {
        mount(<Login />)
        cy.get('[data-testid=welcome]').should('have.text', "Welcome Back")
        cy.get('[data-testid=welcomeSub]').should('have.text', 'Hello there. Sign in to get started.')
    })

    it('has bottom text', () => {
        mount(<Login />)
        cy.get('[data-testid=bottomText]').should('have.text', "Don't have an account? Register")
    })

    it('has working register link', () => {
        mount(<Login />)

        cy.get('a').should('have.text', "Register")
        cy.get('a').should('have.attr', 'href', '/register')
    })

    it('has input Username and Password input', () => {
        mount(<Login />)

        cy.get('input').first().invoke('attr', 'placeholder').should('contain', 'Username')
        cy.get('input').last().invoke('attr', 'placeholder').should('contain', 'Password')
    })

    it('has login Button', () => {
        mount(<Login />)
        cy.get('button').should('have.text', 'Login')
        cy.get('button').should('be.disabled')
    })


})