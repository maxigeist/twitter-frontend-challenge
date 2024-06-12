describe('template spec', () => {

    it('register with error', () => {
        cy.visit('http://localhost:3000')
        cy.visit('http://localhost:3000')
        cy.intercept(
            'POST',
            'http://localhost:8080/api/auth/signup',
            {
                statusCode: 409,
                body: {},
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
        registerDiv.get('.error-message').contains('Must contain at least one uppercase character')
        registerDiv.get('input[name="password"]').clear()
        registerDiv.get('input[name="password"]').type('Ajfnajefneajfnjaef')
        registerDiv.get('input[name="confirmPassword"]').clear()
        registerDiv.get('input[name="confirmPassword"]').type('Ajfnajefneajfnjaef')
        registerDiv.get('button').contains('Register').click()
        registerDiv.get('.error-message').contains('Must contain at least one number')
        registerDiv.get('input[name="password"]').clear()
        registerDiv.get('input[name="password"]').type('Ajfnajefneajfnjaef1')
        registerDiv.get('input[name="confirmPassword"]').clear()
        registerDiv.get('input[name="confirmPassword"]').type('Ajfnajefneajfnjaef1')
        registerDiv.get('.error-message').contains('Must contain at least one special character')
        registerDiv.get('input[name="password"]').clear()
        registerDiv.get('input[name="password"]').type('Ajfnajefneajfnjaef%1')
        registerDiv.get('input[name="confirmPassword"]').clear()
        registerDiv.get('input[name="confirmPassword"]').type('Ajfnajefneajfjaef%1')
        registerDiv.get('.error-message').contains('Passwords must match')
        registerDiv.get('input[name="password"]').clear()
        registerDiv.get('input[name="password"]').type('Ajfnajefneajfnjaef%1')
        registerDiv.get('input[name="confirmPassword"]').clear()
        registerDiv.get('input[name="confirmPassword"]').type('Ajfnajefneajfnjaef%1')
        loginInputDiv.get('button').contains('Register').click()
        registerDiv.get('.error-message').contains('A user with this credentials already exists')

    })
})