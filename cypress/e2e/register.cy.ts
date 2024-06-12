describe('register', () => {
  it('register correctly', () => {
    cy.visit('http://localhost:3000')
    cy.intercept(
        'POST',
        'http://localhost:8080/api/auth/signup',
        {
          statusCode: 200,
          body: {'token': 'nafenajnajfneajnfaeef'},
        }
    );
    const loginInputDiv = cy.get('.input-container')
    loginInputDiv.get('button').contains('Register').click()
    const registerDiv = cy.get('.input-container')
    registerDiv.get('input[name="name"]').type('john')
    registerDiv.get('input[name="username"]').type('johndoe')
    registerDiv.get('input[name="email"]').type('example@gmail.com')
    registerDiv.get('input[name="password"]').type('ajfnajefneajfnjaef')
    registerDiv.get('input[name="confirmPassword"]').type('ajfnajefneajfnjaef')
    registerDiv.get('button').contains('Register').click()
  })
})