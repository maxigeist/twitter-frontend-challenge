

describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.intercept(
        'POST',
        'http://localhost:8080/api/auth/login',
        {
          statusCode: 200,
          body: {'token': 'nafenajnajfneajnfaeef'},
        }
    );
    const inputDiv = cy.get('.input-container')
    inputDiv.get('input[name="email"]').type('example@gmail.com')
    inputDiv.get('input[name="password"]').type('njfneajnfejanf')
    inputDiv.get('button').contains('Login').click()
  })
})