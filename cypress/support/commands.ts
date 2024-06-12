/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/auth/login',
        body: {
            email: 'geistmaximo@gmail.com',
            password: 'MepasQlt14092#%',
        }
    })
        .then((resp) => {
            window.localStorage.setItem('token', resp.body.token)
        })
})