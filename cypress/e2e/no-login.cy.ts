describe('unsuccesfull login', () => {
    it('unsuccessfull login', () => {
        cy.visit('http://localhost:3000')
        const inputDiv = cy.get('.input-container')
        inputDiv.get('input[name="email"]').type('example@gmail.com')
        inputDiv.get('input[name="password"]').type('njfneajnfejanf')
        inputDiv.get('button').contains('Login').click()
        cy.get('.error-message').contains('Sorry, your email or password was incorrect. Please try again.')
    })
})